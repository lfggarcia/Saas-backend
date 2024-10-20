import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CreateApplicationDto } from 'src/applications/dto/create-application.dto/create-application.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)  // Protegemos todas las rutas con JWT
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Obtener todas las aplicaciones de un usuario
  @Get('apps')
  getAllApps(@Req() req: any) {
    return this.usersService.getAllApps(req.user.id);
  }

  // Obtener una aplicación específica por ID
  @Get('apps/:id')
  getAppById(@Param('id') id: string) {
    return this.usersService.getAppById(id);
  }

  // Crear una nueva aplicación
  @Post('apps')
  createApp(@Body() createAppDto: CreateApplicationDto, @Req() req: any) {
		const userId = req.user.id;  // Obtener el ID del usuario autenticado
  	return this.usersService.createApp(createAppDto, userId);
  }

  // Actualizar una aplicación existente
  @Put('apps/:id')
  updateApp(@Param('id') id: string, @Body() updateAppDto: any) {
    return this.usersService.updateApp(id, updateAppDto);
  }

  // Eliminar una aplicación existente
  @Delete('apps/:id')
  deleteApp(@Param('id') id: string) {
    return this.usersService.deleteApp(id);
  }
}
