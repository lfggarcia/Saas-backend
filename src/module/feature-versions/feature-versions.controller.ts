import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FeatureVersionsService } from './feature-versions.service';
import { CreateFeatureVersionDto } from './dto/create-feature-version.dto';
import { UpdateFeatureVersionDto } from './dto/update-feature-version.dto';

@Controller('feature-versions')
export class FeatureVersionsController {
  constructor(private readonly featureVersionsService: FeatureVersionsService) {}

  @Post()
  create(@Body() createFeatureVersionDto: CreateFeatureVersionDto) {
    return this.featureVersionsService.create(createFeatureVersionDto);
  }

  @Get()
  findAll(@Query() query: Partial<CreateFeatureVersionDto>) {
    return this.featureVersionsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.featureVersionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeatureVersionDto: UpdateFeatureVersionDto) {
    return this.featureVersionsService.update(id, updateFeatureVersionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.featureVersionsService.remove(id);
  }
}
