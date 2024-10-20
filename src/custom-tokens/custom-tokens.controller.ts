import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CustomTokensService } from './custom-tokens.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('users/apps/:appId/themes/:themeId/custom-tokens')
@UseGuards(JwtAuthGuard)  // Protegemos todas las rutas con autenticación JWT
export class CustomTokensController {
  constructor(private readonly customTokensService: CustomTokensService) {}

  // Obtener todos los tokens personalizados de un tema (acceso para todos los usuarios autenticados)
  @Get('user/:userId')
  getAllCustomTokens(@Param('themeId') themeId: string, @Param('userId') userId: string) {
    return this.customTokensService.getAllCustomTokens(themeId, userId);
  }

  // Obtener un token personalizado específico (acceso para todos los usuarios autenticados)
  @Get(':id')
  getCustomTokenById(@Param('id') id: string) {
    return this.customTokensService.getCustomTokenById(id);
  }

  @Post('user/:userId')
  createCustomToken(@Param('themeId') themeId: string, @Param('userId') userId: string, @Body() createCustomTokenDto: any) {
    return this.customTokensService.createCustomToken(themeId, userId, createCustomTokenDto);
  }

  @Put(':id')
  updateCustomToken(@Param('id') id: string, @Body() updateCustomTokenDto: any) {
    return this.customTokensService.updateCustomToken(id, updateCustomTokenDto);
  }

  @Delete(':id')
  deleteCustomToken(@Param('id') id: string) {
    return this.customTokensService.deleteCustomToken(id);
  }
}
