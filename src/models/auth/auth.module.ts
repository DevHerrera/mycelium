import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from 'src/controllers/auth/auth.controller';
@Module({
  imports: [],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
