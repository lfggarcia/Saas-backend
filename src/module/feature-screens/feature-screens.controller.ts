import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FeatureScreensService } from './feature-screens.service';
import { CreateFeatureScreenDto } from './dto/create-feature-screen.dto';
import { UpdateFeatureScreenDto } from './dto/update-feature-screen.dto';

@Controller('feature-screens')
export class FeatureScreensController {
  constructor(private readonly featureScreensService: FeatureScreensService) {}

  @Post()
  create(@Body() createFeatureScreenDto: CreateFeatureScreenDto) {
    return this.featureScreensService.create(createFeatureScreenDto);
  }

  @Get()
  findAll(@Query() query: Partial<CreateFeatureScreenDto>) {
    return this.featureScreensService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.featureScreensService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeatureScreenDto: UpdateFeatureScreenDto) {
    return this.featureScreensService.update(id, updateFeatureScreenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.featureScreensService.remove(id);
  }
}
