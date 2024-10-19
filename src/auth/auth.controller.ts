import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)  // Usamos el guard de autenticación local
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);  // El usuario autenticado se envía al servicio de login
  }
}
