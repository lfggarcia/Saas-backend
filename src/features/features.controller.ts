import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CreateFeatureDto } from './dto/create-feature.dto/create-feature.dto';

@Controller('users/apps/:appId/features')
@UseGuards(JwtAuthGuard)
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  // Obtener todas las features de una aplicación
  @Get()
  getAllFeatures(@Param('appId') appId: string) {
    return this.featuresService.getAllFeatures(appId);
  }

  // Obtener una feature específica
  @Get(':id')
  getFeatureById(@Param('id') id: string) {
    return this.featuresService.getFeatureById(id);
  }

  // Crear una nueva feature
  @Post()
  createFeature(
    @Param('appId') appId: string, 
    @Body() createFeatureDto: CreateFeatureDto,
    @Req() req: any
  ) {
    const userId = req.user.id;
    return this.featuresService.createFeature(appId, createFeatureDto, userId);
  }

  // Actualizar una feature existente
  @Put(':id')
  updateFeature(
		@Param('id') id: string,
		@Param('appId') appId: string,
		@Body() updateFeatureDto: any,
		@Req() req: any
	) {
		const userId = req.user.id;
    return this.featuresService.updateFeature(id, updateFeatureDto,appId, userId);
  }

  // Eliminar una feature
  @Delete(':id')
  deleteFeature(
		@Param('id') id: string,
		@Param('appId') appId: string,
		@Req() req: any
	) {
		const userId = req.user.id;
    return this.featuresService.deleteFeature(id, appId, userId);
  }
}
