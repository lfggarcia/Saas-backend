import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ReducerActionsService } from './reducer-actions.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('users/apps/:appId/store/:storeId/reducers/:reducerId/actions')
@UseGuards(JwtAuthGuard)  // Protegemos todas las rutas con autenticación JWT
export class ReducerActionsController {
  constructor(private readonly reducerActionsService: ReducerActionsService) {}

  // Obtener todas las acciones de un reducer (acceso para todos los usuarios autenticados)
  @Get()
  getAllReducerActions(@Param('reducerId') reducerId: string) {
    return this.reducerActionsService.getAllReducerActions(reducerId);
  }

  // Obtener una acción específica (acceso para todos los usuarios autenticados)
  @Get(':id')
  getReducerActionById(@Param('id') id: string) {
    return this.reducerActionsService.getReducerActionById(id);
  }

  // Crear una nueva acción para un reducer (solo super admin o el dueño de la aplicación)
  @Post()
  createReducerAction(@Param('reducerId') reducerId: string, @Body() createReducerActionDto: any) {
    return this.reducerActionsService.createReducerAction(reducerId, createReducerActionDto);
  }

  // Actualizar una acción existente (solo super admin o el dueño de la aplicación)
  @Put(':id')
  updateReducerAction(@Param('id') id: string, @Body() updateReducerActionDto: any) {
    return this.reducerActionsService.updateReducerAction(id, updateReducerActionDto);
  }

  // Eliminar una acción existente (solo super admin o el dueño de la aplicación)
  @Delete(':id')
  deleteReducerAction(@Param('id') id: string) {
    return this.reducerActionsService.deleteReducerAction(id);
  }
}
