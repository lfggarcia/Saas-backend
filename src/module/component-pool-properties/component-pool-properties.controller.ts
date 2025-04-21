import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ComponentPoolPropertiesService } from './component-pool-properties.service';
import { CreateComponentPoolPropertyDto } from './dto/create-component-pool-property.dto';
import { UpdateComponentPoolPropertyDto } from './dto/update-component-pool-property.dto';

@Controller('component-pool-properties')
export class ComponentPoolPropertiesController {
  constructor(private readonly componentPoolPropertiesService: ComponentPoolPropertiesService) {}

  @Post()
  create(@Body() createComponentPoolPropertyDto: CreateComponentPoolPropertyDto) {
    return this.componentPoolPropertiesService.create(createComponentPoolPropertyDto);
  }

  @Get()
  findAll(@Query() query: Partial<CreateComponentPoolPropertyDto>) {
    return this.componentPoolPropertiesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.componentPoolPropertiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComponentPoolPropertyDto: UpdateComponentPoolPropertyDto) {
    return this.componentPoolPropertiesService.update(id, updateComponentPoolPropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.componentPoolPropertiesService.remove(id);
  }
}
