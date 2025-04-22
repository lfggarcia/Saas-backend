import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FeatureVersionScreensService } from './feature-version-screens.service';
import { CreateFeatureVersionScreenDto } from './dto/create-feature-version-screen.dto';
import { UpdateFeatureVersionScreenDto } from './dto/update-feature-version-screen.dto';

@Controller('feature-version-screens')
export class FeatureVersionScreensController {
  constructor(private readonly featureVersionScreensService: FeatureVersionScreensService) {}

  @Post()
  create(@Body() createFeatureVersionScreenDto: CreateFeatureVersionScreenDto) {
    return this.featureVersionScreensService.create(createFeatureVersionScreenDto);
  }

  @Get()
  findAll(@Query() query: Partial<CreateFeatureVersionScreenDto>) {
    return this.featureVersionScreensService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.featureVersionScreensService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeatureVersionScreenDto: UpdateFeatureVersionScreenDto) {
    return this.featureVersionScreensService.update(id, updateFeatureVersionScreenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.featureVersionScreensService.remove(id);
  }
}
