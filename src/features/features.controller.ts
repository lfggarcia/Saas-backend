import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';

import { AuthGuard } from '@nestjs/passport';

@Controller('features')
@UseGuards(AuthGuard('jwt'))
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Post()
  create(@Body() createFeatureDto: CreateFeatureDto, @Request() req) {
    const userId = req.user.id;
    return this.featuresService.create(createFeatureDto, userId);
  }

  @Get()
  findAll(@Request() req) {
    const userId = req.user.id;
    return this.featuresService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.featuresService.findOne(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeatureDto: UpdateFeatureDto, @Request() req) {
    const userId = req.user.id;
    return this.featuresService.update(id, updateFeatureDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.featuresService.remove(id, userId);
  }
}
