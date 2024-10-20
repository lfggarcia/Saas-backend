import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { ThemeTokensService } from './theme-tokens.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CreateThemeTokenDto } from './dto/create-theme-token.dto/create-theme-token.dto';

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
  createThemeToken(
    @Param('themeId') themeId: string,
    @Body() createThemeTokenDto: CreateThemeTokenDto,
    @Req() req: any
  ) {
    const userId = req.user.id;  // Obtener el ID del usuario autenticado
    return this.themeTokensService.createThemeToken(themeId, createThemeTokenDto, userId);
  }

  @Put(':id')
  updateThemeToken(
    @Param('id') id: string, 
    @Body() updateThemeTokenDto: CreateThemeTokenDto,
    @Req() req: any
  ) {
    const userId = req.user.id;
    return this.themeTokensService.updateThemeToken(id, updateThemeTokenDto, userId);
  }

  @Delete(':id')
  deleteThemeToken(
    @Param('id') id: string,
    @Req() req: any
  ) {
    const userId = req.user.id;
    return this.themeTokensService.deleteThemeToken(id, userId);
  }
}
