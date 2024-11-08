import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { GlobalComponentsService } from './global-components.service';
import { CreateGlobalComponentDto } from './dto/create-global-component.dto';
import { UpdateGlobalComponentDto } from './dto/update-global-component.dto';

import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('global-components')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class GlobalComponentsController {
  constructor(private readonly globalComponentsService: GlobalComponentsService) {}

  @Post()
  @Roles('admin')
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
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateGlobalComponentDto: UpdateGlobalComponentDto) {
    return this.globalComponentsService.update(id, updateGlobalComponentDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.globalComponentsService.remove(id);
  }
}
