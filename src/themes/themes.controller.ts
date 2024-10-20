import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CreateThemeDto } from './dto/create-theme.dto/create-theme.dto';

@Controller('users/apps/:appId/themes')
@UseGuards(JwtAuthGuard)  // Protegemos todas las rutas con autenticación JWT
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  // Obtener todos los temas de una aplicación
  @Get()
  getAllThemes(@Param('appId') appId: string) {
    return this.themesService.getAllThemes(appId);
  }

  // Obtener un tema específico
  @Get(':id')
  getThemeById(@Param('id') id: string) {
    return this.themesService.getThemeById(id);
  }

  // Crear un nuevo tema
  @Post()
  createTheme(
    @Param('appId') appId: string,
    @Body() createThemeDto: CreateThemeDto,
    @Req() req: any
  ) {
    const userId = req.user.id;  // Obtener el ID del usuario autenticado
    return this.themesService.createTheme(appId, createThemeDto, userId);
  }

  // Actualizar un tema existente
  @Put(':id')
  updateTheme(
    @Param('id') id: string,
    @Body() updateThemeDto: CreateThemeDto,
    @Req() req: any
  ) {
    const userId = req.user.id;
    return this.themesService.updateTheme(id, updateThemeDto, userId);
  }

  // Eliminar un tema
  @Delete(':id')
  deleteTheme(
    @Param('id') id: string,
    @Req() req: any
  ) {
    const userId = req.user.id;
    return this.themesService.deleteTheme(id, userId);
  }
}
