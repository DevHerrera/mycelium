import { AuthenticationGuard } from '@nestjs-cognito/auth';
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/models/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('hello')
  @UseGuards(AuthenticationGuard)
  @HttpCode(HttpStatus.OK)
  async hello() {
    return {
      hello: 'hello',
    };
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body()
    body: {
      username: string;
      password: string;
      name: string;
      email: string;
    },
  ) {
    const { email, name, username, password } = body;
    const tokens = await this.authService.signUp(
      username,
      password,
      email,
      name,
    );
    return {
      message: 'Sign-up successful',
      tokens,
    };
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body()
    body: {
      username: string;
      password: string;
    },
  ) {
    const { username, password } = body;
    const tokens = await this.authService.signIn(username, password);
    return {
      message: 'Sign-in successful',
      tokens,
    };
  }

  @Post('sign-out')
  @HttpCode(HttpStatus.OK)
  async signOut(@Body() body: { accessToken: string }) {
    const { accessToken } = body;
    await this.authService.signOut(accessToken);
    return {
      message: 'Sign-out successful',
    };
  }
}
