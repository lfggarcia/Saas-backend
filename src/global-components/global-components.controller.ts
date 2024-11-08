import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { GlobalComponentsService } from './global-components.service';
import { CreateGlobalComponentDto } from './dto/create-global-component.dto';
import { UpdateGlobalComponentDto } from './dto/update-global-component.dto';

@Controller('global-components')
export class GlobalComponentsController {
  constructor(private readonly globalComponentsService: GlobalComponentsService) {}

  @Post()
  create(@Body() createGlobalComponentDto: CreateGlobalComponentDto) {
    return this.globalComponentsService.create(createGlobalComponentDto);
  }

  @Get()
  findAll() {
    return this.globalComponentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.globalComponentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGlobalComponentDto: UpdateGlobalComponentDto) {
    return this.globalComponentsService.update(id, updateGlobalComponentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.globalComponentsService.remove(id);
  }
}
