import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/dataSource';
import { AuthModule } from './models/auth/auth.module';
import { LinksModule } from './models/links/links.module';
import { CognitoAuthModule } from '@nestjs-cognito/auth';
import { ConfigService } from '@nestjs/config';
import { S3Service } from './services/aws/s3.service';
import { PagesModule } from './models/pages/pages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    LinksModule,
    PagesModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule,
    CognitoAuthModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        jwtVerifier: {
          tokenUse: 'access',
          clientSecret: configService.get<string>('COGNITO_CLIENT_SECRET'),
          userPoolId: configService.get<string>('COGNITO_USER_POOL_ID'),
          clientId: configService.get<string>('COGNITO_CLIENT_ID'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, S3Service],
})
export class AppModule {}
