import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { AppsService } from './apps.service';
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';

import { AuthGuard } from '@nestjs/passport';

@Controller('apps')
@UseGuards(AuthGuard('jwt'))
export class AppsController {
  constructor(private readonly appsService: AppsService) {}

  @Post()
  create(@Body() createAppDto: CreateAppDto, @Request() req) {
    const userId = req.user.id;
    return this.appsService.create(createAppDto, userId);
  }

  @Get()
  async findAll(@Request() req) {
    const user = req.user;
    if (user.role.name === 'admin' || user.role.name === 'superadmin') {
      return this.appsService.findAll();
    } else {
      return this.appsService.findAllByUser(user.id);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    const user = req.user;
    const app = await this.appsService.findOne(id);
    if (!app) {
      throw new ForbiddenException('Aplicación no encontrada');
    }
    if (app.user.id !== user.id && user.role.name !== 'admin' && user.role.name !== 'superadmin') {
      throw new ForbiddenException('No tienes permiso para acceder a esta aplicación');
    }
    return app;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAppDto: UpdateAppDto, @Request() req) {
    const user = req.user;
    const app = await this.appsService.findOne(id);
    if (!app) {
      throw new ForbiddenException('Aplicación no encontrada');
    }
    if (app.user.id !== user.id && user.role.name !== 'admin' && user.role.name !== 'superadmin') {
      throw new ForbiddenException('No tienes permiso para actualizar esta aplicación');
    }
    return this.appsService.update(id, updateAppDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    const user = req.user;
    const app = await this.appsService.findOne(id);
    if (!app) {
      throw new ForbiddenException('Aplicación no encontrada');
    }
    if (app.user.id !== user.id && user.role.name !== 'admin' && user.role.name !== 'superadmin') {
      throw new ForbiddenException('No tienes permiso para eliminar esta aplicación');
    }
    return this.appsService.remove(id);
  }
}
