import { Controller, Get, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)  // Usamos el guard de JWT para proteger las rutas
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('apps')
  getAllApps(@Req() req: any) {
    return this.usersService.getAllApps(req.user.id);
  }

  @Post('apps')
  createApp(@Body() createAppDto: any, @Req() req: any) {
    return this.usersService.createApp(createAppDto, req.user.id);
  }

  @Get('apps/:id')
  getAppById(@Param('id') id: string) {
    return this.usersService.getAppById(id);
  }
}
