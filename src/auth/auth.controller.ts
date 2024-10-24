import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from './guards/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    // Asignamos el rol 'user' por defecto
    const user = await this.usersService.create({
      ...createUserDto
    });
    const { password, ...result } = user;
    return result;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
