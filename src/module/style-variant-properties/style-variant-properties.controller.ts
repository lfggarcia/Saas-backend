import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StyleVariantPropertiesService } from './style-variant-properties.service';
import { CreateStyleVariantPropertyDto } from './dto/create-style-variant-property.dto';
import { UpdateStyleVariantPropertyDto } from './dto/update-style-variant-property.dto';

@Controller('style-variant-properties')
export class StyleVariantPropertiesController {
  constructor(private readonly styleVariantPropertiesService: StyleVariantPropertiesService) {}

  @Post()
  create(@Body() createStyleVariantPropertyDto: CreateStyleVariantPropertyDto) {
    return this.styleVariantPropertiesService.create(createStyleVariantPropertyDto);
  }

  @Get()
  findAll() {
    return this.styleVariantPropertiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.styleVariantPropertiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStyleVariantPropertyDto: UpdateStyleVariantPropertyDto) {
    return this.styleVariantPropertiesService.update(+id, updateStyleVariantPropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.styleVariantPropertiesService.remove(+id);
  }
}
