import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { ScreenComponentsService } from './screen-components.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CreateScreenComponentDto } from './dto/create-screen-component.dto/create-screen-component.dto';

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

  // Crear un nuevo componente de pantalla
  @Post()
  createScreenComponent(
    @Param('screenId') screenId: string,
    @Body() createScreenComponentDto: CreateScreenComponentDto,
    @Req() req: any
  ) {
    const userId = req.user.id;  // Obtener el ID del usuario autenticado
    return this.screenComponentsService.createScreenComponent(screenId, createScreenComponentDto, userId);
  }

  // Actualizar un componente de pantalla existente
  @Put(':id')
  updateScreenComponent(
    @Param('id') id: string, 
    @Body() updateScreenComponentDto: CreateScreenComponentDto,
    @Req() req: any
  ) {
    const userId = req.user.id;
    return this.screenComponentsService.updateScreenComponent(id, updateScreenComponentDto, userId);
  }

  // Eliminar un componente de pantalla
  @Delete(':id')
  deleteScreenComponent(
    @Param('id') id: string,
    @Req() req: any
  ) {
    const userId = req.user.id;
    return this.screenComponentsService.deleteScreenComponent(id, userId);
  }
}
