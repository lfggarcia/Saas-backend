import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ComponentPoolService } from './component-pool.service';
import { CreateComponentPoolDto } from './dto/create-component-pool.dto';
import { UpdateComponentPoolDto } from './dto/update-component-pool.dto';

@Controller('component-pool')
export class ComponentPoolController {
  constructor(private readonly componentPoolService: ComponentPoolService) {}

  @Post()
  create(@Body() createComponentPoolDto: CreateComponentPoolDto) {
    return this.componentPoolService.create(createComponentPoolDto);
  }

  @Get()
  findAll(@Query() query: Partial<CreateComponentPoolDto>) {
    return this.componentPoolService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.componentPoolService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComponentPoolDto: UpdateComponentPoolDto) {
    return this.componentPoolService.update(id, updateComponentPoolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.componentPoolService.remove(id);
  }
}
