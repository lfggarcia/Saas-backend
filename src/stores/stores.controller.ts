import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { StoresService } from './stores.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('users/apps/:appId/store')
@UseGuards(JwtAuthGuard)  // Protegemos todas las rutas con autenticación JWT
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  // Obtener la store de una aplicación (acceso para todos los usuarios autenticados)
  @Get()
  getStoreByAppId(@Param('appId') appId: string) {
    return this.storesService.getStoreByAppId(appId);
  }

  // Crear una nueva store (solo super admin o el dueño de la aplicación)
  @Post()
  createStore(@Param('appId') appId: string, @Body() createStoreDto: any) {
    return this.storesService.createStore(appId, createStoreDto);
  }

  // Actualizar una store existente (solo super admin o el dueño de la aplicación)
  @Put(':id')
  updateStore(@Param('id') id: string, @Body() updateStoreDto: any) {
    return this.storesService.updateStore(id, updateStoreDto);
  }

  // Eliminar una store (solo super admin o el dueño de la aplicación)
  @Delete(':id')
  deleteStore(@Param('id') id: string) {
    return this.storesService.deleteStore(id);
  }
}
