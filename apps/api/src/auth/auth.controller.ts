import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register') // POST /api/auth/register
  register(@Body() dto: AuthCredentialsDto) {
    return this.auth.register(dto);
  }

  @Post('login') // POST /api/auth/login
  @HttpCode(HttpStatus.OK) // a successful login is 200, not 201
  login(@Body() dto: AuthCredentialsDto) {
    return this.auth.login(dto);
  }
}
