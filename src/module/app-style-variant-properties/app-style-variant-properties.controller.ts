import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppStyleVariantPropertiesService } from './app-style-variant-properties.service';
import { CreateAppStyleVariantPropertyDto } from './dto/create-app-style-variant-property.dto';
import { UpdateAppStyleVariantPropertyDto } from './dto/update-app-style-variant-property.dto';

@Controller('app-style-variant-properties')
export class AppStyleVariantPropertiesController {
  constructor(private readonly appStyleVariantPropertiesService: AppStyleVariantPropertiesService) {}

  @Post()
  create(@Body() createAppStyleVariantPropertyDto: CreateAppStyleVariantPropertyDto) {
    return this.appStyleVariantPropertiesService.create(createAppStyleVariantPropertyDto);
  }

  @Get()
  findAll() {
    return this.appStyleVariantPropertiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appStyleVariantPropertiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppStyleVariantPropertyDto: UpdateAppStyleVariantPropertyDto) {
    return this.appStyleVariantPropertiesService.update(+id, updateAppStyleVariantPropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appStyleVariantPropertiesService.remove(+id);
  }
}
