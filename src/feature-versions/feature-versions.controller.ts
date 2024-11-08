import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { FeatureVersionsService } from './feature-versions.service';
import { CreateFeatureVersionDto } from './dto/create-feature-version.dto';
import { UpdateFeatureVersionDto } from './dto/update-feature-version.dto';

import { AuthGuard } from '@nestjs/passport';

@Controller('feature-versions')
@UseGuards(AuthGuard('jwt'))
export class FeatureVersionsController {
  constructor(private readonly featureVersionsService: FeatureVersionsService) {}

  @Post()
  create(@Body() createFeatureVersionDto: CreateFeatureVersionDto, @Request() req) {
    const userId = req.user.id;
    return this.featureVersionsService.create(createFeatureVersionDto, userId);
  }

  @Get('feature/:featureId')
  findAllByFeature(@Param('featureId') featureId: string, @Request() req) {
    const userId = req.user.id;
    return this.featureVersionsService.findAllByFeature(featureId, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.featureVersionsService.findOne(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeatureVersionDto: UpdateFeatureVersionDto, @Request() req) {
    const userId = req.user.id;
    return this.featureVersionsService.update(id, updateFeatureVersionDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.featureVersionsService.remove(id, userId);
  }
}
