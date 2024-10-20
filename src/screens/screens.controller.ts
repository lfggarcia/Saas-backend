import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { ScreensService } from './screens.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CreateScreenDto } from './dto/create-screen.dto/create-screen.dto';

@Controller('users/apps/:appId/features/:featureId/screens')
@UseGuards(JwtAuthGuard)  // Protegemos las rutas con JWT
export class ScreensController {
  constructor(private readonly screensService: ScreensService) {}

  // Obtener todas las pantallas de una feature
  @Get()
  getAllScreens(@Param('featureId') featureId: string) {
    return this.screensService.getAllScreens(featureId);
  }

  // Obtener una pantalla específica
  @Get(':id')
  getScreenById(@Param('id') id: string) {
    return this.screensService.getScreenById(id);
	}
 
  // Crear una nueva pantalla
  @Post()
  createScreen(
    @Param('featureId') featureId: string, 
    @Body() createScreenDto: CreateScreenDto,
    @Req() req: any
  ) {
    const userId = req.user.id;  // Obtener el ID del usuario autenticado
    return this.screensService.createScreen(featureId, createScreenDto, userId);
  }

  // Actualizar una pantalla existente
  @Put(':id')
  updateScreen(
    @Param('id') id: string, 
    @Body() updateScreenDto: any,
    @Req() req: any
  ) {
    const userId = req.user.id;
    return this.screensService.updateScreen(id, updateScreenDto, userId);
  }

  // Eliminar una pantalla
  @Delete(':id')
  deleteScreen(
    @Param('id') id: string,
    @Req() req: any
  ) {
    const userId = req.user.id;
    return this.screensService.deleteScreen(id, userId);
  }
}
