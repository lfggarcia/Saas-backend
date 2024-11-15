import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LocalAuthGuard } from '../../commons/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UserService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: any) {
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

	@Post('admin/register')
	async registerAdmin(@Body() createUserDto: any) {
		const user = await this.usersService.create({
			...createUserDto
		}, 'admin');
		const { password, ...result } = user;
		return result;
	}
}