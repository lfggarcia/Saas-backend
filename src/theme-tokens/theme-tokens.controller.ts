import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ThemeTokensService } from './theme-tokens.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('users/apps/:appId/themes/:themeId/tokens')
@UseGuards(JwtAuthGuard)  // Protegemos todas las rutas con autenticación JWT
export class ThemeTokensController {
  constructor(private readonly themeTokensService: ThemeTokensService) {}

  @Get()
  getAllThemeTokens(@Param('themeId') themeId: string) {
    return this.themeTokensService.getAllThemeTokens(themeId);
  }

  @Get(':id')
  getThemeTokenById(@Param('id') id: string) {
    return this.themeTokensService.getThemeTokenById(id);
  }

  @Post()
  createThemeToken(@Param('themeId') themeId: string, @Body() createThemeTokenDto: any) {
    return this.themeTokensService.createThemeToken(themeId, createThemeTokenDto);
  }

  @Put(':id')
  updateThemeToken(@Param('id') id: string, @Body() updateThemeTokenDto: any) {
    return this.themeTokensService.updateThemeToken(id, updateThemeTokenDto);
  }

  @Delete(':id')
  deleteThemeToken(@Param('id') id: string) {
    return this.themeTokensService.deleteThemeToken(id);
  }
}
