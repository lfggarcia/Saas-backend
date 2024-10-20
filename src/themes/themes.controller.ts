import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('users/apps/:appId/themes')
@UseGuards(JwtAuthGuard)  // Protegemos todas las rutas con autenticación JWT
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  // Obtener todos los temas de una aplicación (acceso para todos los usuarios autenticados)
  @Get()
  getAllThemes(@Param('appId') appId: string) {
    return this.themesService.getAllThemes(appId);
  }

  // Obtener un tema específico (acceso para todos los usuarios autenticados)
  @Get(':id')
  getThemeById(@Param('id') id: string) {
    return this.themesService.getThemeById(id);
  }

  // Crear un nuevo tema (solo super admin)
  @Post()
  createTheme(@Param('appId') appId: string, @Body() createThemeDto: any) {
    return this.themesService.createTheme(appId, createThemeDto);
  }

  // Actualizar un tema existente (solo super admin)
  @Put(':id')
  updateTheme(@Param('id') id: string, @Body() updateThemeDto: any) {
    return this.themesService.updateTheme(id, updateThemeDto);
  }

  // Eliminar un tema (solo super admin)
  @Delete(':id')
  deleteTheme(@Param('id') id: string) {
    return this.themesService.deleteTheme(id);
  }
}
