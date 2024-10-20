import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { FeatureVersionsService } from './feature-versions.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CreateFeatureVersionDto } from './dto/create-feature-version.dto/create-feature-version.dto';

@Controller('users/apps/:appId/features/:featureId/versions')
@UseGuards(JwtAuthGuard)
export class FeatureVersionsController {
  constructor(private readonly featureVersionsService: FeatureVersionsService) {}

  // Obtener todas las versiones de una feature
  @Get()
  getAllFeatureVersions(@Param('featureId') featureId: string) {
    return this.featureVersionsService.getAllFeatureVersions(featureId);
  }

  // Obtener una versión específica de una feature
  @Get(':id')
  getFeatureVersionById(@Param('id') id: string) {
    return this.featureVersionsService.getFeatureVersionById(id);
  }

  // Crear una nueva versión de una feature
  @Post()
  createFeatureVersion(
    @Param('featureId') featureId: string,
    @Body() createFeatureVersionDto: CreateFeatureVersionDto,
    @Req() req: any
  ) {
    const userId = req.user.id;  // Obtener el ID del usuario autenticado desde el token
    return this.featureVersionsService.createFeatureVersion(featureId, createFeatureVersionDto, userId);
  }

  // Actualizar una versión de una feature
  @Put(':id')
  updateFeatureVersion(
    @Param('id') id: string, 
    @Body() updateFeatureVersionDto: any, 
    @Req() req: any
  ) {
    const userId = req.user.id;
    return this.featureVersionsService.updateFeatureVersion(id, updateFeatureVersionDto, userId);
  }

  // Eliminar una versión de una feature
  @Delete(':id')
  deleteFeatureVersion(
    @Param('id') id: string, 
    @Req() req: any
  ) {
    const userId = req.user.id;
    return this.featureVersionsService.deleteFeatureVersion(id, userId);
  }
}
