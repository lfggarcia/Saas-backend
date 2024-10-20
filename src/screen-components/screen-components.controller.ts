import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ScreenComponentsService } from './screen-components.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('users/apps/:appId/features/:featureId/screens/:screenId/components')
@UseGuards(JwtAuthGuard)  // Protegemos todas las rutas con autenticación JWT
export class ScreenComponentsController {
  constructor(private readonly screenComponentsService: ScreenComponentsService) {}

  // Obtener todos los componentes de una pantalla (acceso para todos los usuarios autenticados)
  @Get()
  getAllScreenComponents(@Param('screenId') screenId: string) {
    return this.screenComponentsService.getAllScreenComponents(screenId);
  }

  // Obtener un componente de pantalla específico (acceso para todos los usuarios autenticados)
  @Get(':id')
  getScreenComponentById(@Param('id') id: string) {
    return this.screenComponentsService.getScreenComponentById(id);
  }

  // Crear un nuevo componente de pantalla (solo super admin)
  @Post()
  createScreenComponent(@Param('screenId') screenId: string, @Body() createScreenComponentDto: any) {
    return this.screenComponentsService.createScreenComponent(screenId, createScreenComponentDto);
  }

  // Actualizar un componente de pantalla existente (solo super admin)
  @Put(':id')
  updateScreenComponent(@Param('id') id: string, @Body() updateScreenComponentDto: any) {
    return this.screenComponentsService.updateScreenComponent(id, updateScreenComponentDto);
  }

  // Eliminar un componente de pantalla (solo super admin)
  @Delete(':id')
  deleteScreenComponent(@Param('id') id: string) {
    return this.screenComponentsService.deleteScreenComponent(id);
  }
}
