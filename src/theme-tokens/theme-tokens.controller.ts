import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { ThemeTokensService } from './theme-tokens.service';
import { CreateThemeTokenDto } from './dto/create-theme-token.dto';
import { UpdateThemeTokenDto } from './dto/update-theme-token.dto';

import { AuthGuard } from '@nestjs/passport';

@Controller('theme-tokens')
@UseGuards(AuthGuard('jwt'))
export class ThemeTokensController {
  constructor(private readonly themeTokensService: ThemeTokensService) {}

  @Post()
  create(@Body() createThemeTokenDto: CreateThemeTokenDto, @Request() req) {
    const userId = req.user.id;
    return this.themeTokensService.create(createThemeTokenDto, userId);
  }

  @Get('theme/:themeId')
  findAllByTheme(@Param('themeId') themeId: string, @Request() req) {
    const userId = req.user.id;
    return this.themeTokensService.findAllByTheme(themeId, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.themeTokensService.findOne(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateThemeTokenDto: UpdateThemeTokenDto, @Request() req) {
    const userId = req.user.id;
    return this.themeTokensService.update(id, updateThemeTokenDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.themeTokensService.remove(id, userId);
  }
}
