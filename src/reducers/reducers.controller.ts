import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ReducersService } from './reducers.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('users/apps/:appId/store/:storeId/reducers')
@UseGuards(JwtAuthGuard)  // Protegemos todas las rutas con autenticación JWT
export class ReducersController {
  constructor(private readonly reducersService: ReducersService) {}

  // Obtener todos los reducers de una store (acceso para todos los usuarios autenticados)
  @Get()
  getAllReducers(@Param('storeId') storeId: string) {
    return this.reducersService.getAllReducers(storeId);
  }

  // Obtener un reducer específico (acceso para todos los usuarios autenticados)
  @Get(':id')
  getReducerById(@Param('id') id: string) {
    return this.reducersService.getReducerById(id);
  }

  // Crear un nuevo reducer (solo super admin o el dueño de la aplicación)
  @Post()
  createReducer(@Param('storeId') storeId: string, @Body() createReducerDto: any) {
    return this.reducersService.createReducer(storeId, createReducerDto);
  }

  // Actualizar un reducer existente (solo super admin o el dueño de la aplicación)
  @Put(':id')
  updateReducer(@Param('id') id: string, @Body() updateReducerDto: any) {
    return this.reducersService.updateReducer(id, updateReducerDto);
  }

  // Eliminar un reducer (solo super admin o el dueño de la aplicación)
  @Delete(':id')
  deleteReducer(@Param('id') id: string) {
    return this.reducersService.deleteReducer(id);
  }
}
