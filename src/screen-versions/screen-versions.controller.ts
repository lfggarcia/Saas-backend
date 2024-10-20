import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { ScreenVersionsService } from './screen-versions.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CreateScreenVersionDto } from './dto/create-screen-version.dto/create-screen-version.dto';

@Controller('users/apps/:appId/features/:featureId/screens/:screenId/versions')
@UseGuards(JwtAuthGuard)
export class ScreenVersionsController {
  constructor(private readonly screenVersionsService: ScreenVersionsService) {}

  // Obtener todas las versiones de una pantalla
  @Get()
  getAllScreenVersions(@Param('screenId') screenId: string) {
    return this.screenVersionsService.getAllScreenVersions(screenId);
  }

  // Obtener una versión específica de una pantalla
  @Get(':id')
  getScreenVersionById(@Param('id') id: string) {
    return this.screenVersionsService.getScreenVersionById(id);
  }

  // Crear una nueva versión de una pantalla
  @Post()
  createScreenVersion(
    @Param('screenId') screenId: string,
    @Body() createScreenVersionDto: CreateScreenVersionDto,
    @Req() req: any
  ) {
    const userId = req.user.id;  // Obtener el ID del usuario autenticado desde el token
    return this.screenVersionsService.createScreenVersion(screenId, createScreenVersionDto, userId);
  }

  // Actualizar una versión de una pantalla
  @Put(':id')
  updateScreenVersion(
    @Param('id') id: string, 
    @Body() updateScreenVersionDto: any, 
    @Req() req: any
  ) {
    const userId = req.user.id;
    return this.screenVersionsService.updateScreenVersion(id, updateScreenVersionDto, userId);
  }

  // Eliminar una versión de una pantalla
  @Delete(':id')
  deleteScreenVersion(
    @Param('id') id: string, 
    @Req() req: any
  ) {
    const userId = req.user.id;
    return this.screenVersionsService.deleteScreenVersion(id, userId);
  }
}
