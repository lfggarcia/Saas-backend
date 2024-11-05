import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { GlobalComponentsService } from './global-components.service';
import { CreateGlobalComponentDto } from './dto/create-global-component.dto';
import { UpdateGlobalComponentDto } from './dto/update-global-component.dto';

import { AuthGuard } from '@nestjs/passport';

@Controller('global-components')
@UseGuards(AuthGuard('jwt'))
export class GlobalComponentsController {
  constructor(private readonly globalComponentsService: GlobalComponentsService) {}

  @Post()
  create(@Body() createGlobalComponentDto: CreateGlobalComponentDto, @Request() req) {
    const userId = req.user.id;
    return this.globalComponentsService.create(createGlobalComponentDto, userId);
  }

  @Get()
  findAll(@Request() req) {
    const userId = req.user.id;
    return this.globalComponentsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.globalComponentsService.findOne(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGlobalComponentDto: UpdateGlobalComponentDto, @Request() req) {
    const userId = req.user.id;
    return this.globalComponentsService.update(id, updateGlobalComponentDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.globalComponentsService.remove(id, userId);
  }
}
