import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { GlobalComponentsService } from './global-components.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { SuperAdminGuard } from 'src/auth/super-admin/super-admin.guard';

@Controller('global-components')
@UseGuards(JwtAuthGuard)  // Protegemos todas las rutas con autenticación JWT
export class GlobalComponentsController {
  constructor(private readonly globalComponentsService: GlobalComponentsService) {}

  // Obtener todos los componentes globales (acceso para todos los usuarios autenticados)
  @Get()
  getAllGlobalComponents() {
    return this.globalComponentsService.getAllGlobalComponents();
  }

  // Obtener un componente global específico (acceso para todos los usuarios autenticados)
  @Get(':id')
  getGlobalComponentById(@Param('id') id: string) {
    return this.globalComponentsService.getGlobalComponentById(id);
  }

  // Crear un nuevo componente global (solo super admin)
  @UseGuards(SuperAdminGuard)  // Protegemos la creación solo para super admin
  @Post()
  createGlobalComponent(@Body() createGlobalComponentDto: any) {
    return this.globalComponentsService.createGlobalComponent(createGlobalComponentDto);
  }

  // Actualizar un componente global existente (solo super admin)
  @UseGuards(SuperAdminGuard)  // Protegemos la actualización solo para super admin
  @Put(':id')
  updateGlobalComponent(@Param('id') id: string, @Body() updateGlobalComponentDto: any) {
    return this.globalComponentsService.updateGlobalComponent(id, updateGlobalComponentDto);
  }

  // Eliminar un componente global (solo super admin)
  @UseGuards(SuperAdminGuard)  // Protegemos la eliminación solo para super admin
  @Delete(':id')
  deleteGlobalComponent(@Param('id') id: string) {
    return this.globalComponentsService.deleteGlobalComponent(id);
  }
}
