import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ComponentTypesService } from './component_types.service';
import { CreateComponentTypeDto } from './dto/create-component_type.dto';
import { UpdateComponentTypeDto } from './dto/update-component_type.dto';

@Controller('component-types')
export class ComponentTypesController {
  constructor(private readonly componentTypesService: ComponentTypesService) {}

  @Post()
  create(@Body() createComponentTypeDto: CreateComponentTypeDto) {
    return this.componentTypesService.create(createComponentTypeDto);
  }

  @Get()
  findAll(@Query() query: Partial<CreateComponentTypeDto>) {
    return this.componentTypesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.componentTypesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComponentTypeDto: UpdateComponentTypeDto) {
    return this.componentTypesService.update(id, updateComponentTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.componentTypesService.remove(id);
  }
}
