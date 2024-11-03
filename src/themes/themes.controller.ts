import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';

import { AuthGuard } from '@nestjs/passport';

@Controller('themes')
@UseGuards(AuthGuard('jwt'))
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @Post()
  create(@Body() createThemeDto: CreateThemeDto, @Request() req) {
    const userId = req.user.id;
    return this.themesService.create(createThemeDto, userId);
  }

  @Get()
  findAll(@Request() req) {
    const userId = req.user.id;
    return this.themesService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.themesService.findOne(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateThemeDto: UpdateThemeDto, @Request() req) {
    const userId = req.user.id;
    return this.themesService.update(id, updateThemeDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.themesService.remove(id, userId);
  }
}
