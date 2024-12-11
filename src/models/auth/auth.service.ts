import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  GlobalSignOutCommand,
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  private cognitoClient: CognitoIdentityProviderClient;

  constructor(private readonly configService: ConfigService) {
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_KEY'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_KEY'),
      },
    });
  }

  private generateSecretHash(
    username: string,
    clientId: string,
    clientSecret: string,
  ): string {
    const hmac = crypto.createHmac('sha256', clientSecret);
    hmac.update(username + clientId);
    return hmac.digest('base64');
  }

  async signUp(
    username: string,
    password: string,
    email: string,
    name: string,
  ) {
    const userPoolId = this.configService.get<string>('COGNITO_USER_POOL_ID');
    const creationCommand = new AdminCreateUserCommand({
      UserPoolId: userPoolId,
      Username: username,
      MessageAction: 'SUPPRESS',
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        },
        {
          Name: 'name',
          Value: name,
        },
      ],
    });
    const setPasswordCommand = new AdminSetUserPasswordCommand({
      UserPoolId: userPoolId,
      Username: username,
      Password: password,
      Permanent: true,
    });

    try {
      const result = await this.cognitoClient.send(creationCommand);
      await this.cognitoClient.send(setPasswordCommand);
      return result;
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async signIn(
    username: string,
    password: string,
  ): Promise<{ accessToken: string; idToken: string; refreshToken: string }> {
    const clientId = this.configService.get<string>('COGNITO_CLIENT_ID');
    const clientSecret = this.configService.get<string>(
      'COGNITO_CLIENT_SECRET',
    );

    const secretHash = this.generateSecretHash(
      username,
      clientId,
      clientSecret,
    );

    const command = new InitiateAuthCommand({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: this.configService.get<string>('COGNITO_CLIENT_ID'),
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        SECRET_HASH: secretHash,
      },
    });

    try {
      const response = await this.cognitoClient.send(command);
      console.log({ response });
      if (!response.AuthenticationResult) {
        throw new Error('Authentication failed');
      }

      const { AccessToken, IdToken, RefreshToken } =
        response.AuthenticationResult;
      return {
        accessToken: AccessToken!,
        idToken: IdToken!,
        refreshToken: RefreshToken!,
      };
    } catch (error) {
      throw new Error(`Sign-in failed: ${error.message}`);
    }
  }

  async signOut(accessToken: string): Promise<void> {
    const command = new GlobalSignOutCommand({
      AccessToken: accessToken,
    });

    try {
      await this.cognitoClient.send(command);
    } catch (error) {
      throw new Error(`Sign-out failed: ${error.message}`);
    }
  }
}
