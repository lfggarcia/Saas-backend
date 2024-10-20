import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { CustomTokensService } from './custom-tokens.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CreateCustomTokenDto } from './dto/create-custom-token.dto/create-custom-token.dto';

@Controller('users/apps/:appId/themes/:themeId/custom-tokens')
@UseGuards(JwtAuthGuard)  // Protegemos todas las rutas con autenticación JWT
export class CustomTokensController {
  constructor(private readonly customTokensService: CustomTokensService) {}

  @Get('user/:userId')
  getAllCustomTokens(@Param('themeId') themeId: string, @Param('userId') userId: string) {
    return this.customTokensService.getAllCustomTokens(themeId, userId);
  }

  @Get(':id')
  getCustomTokenById(@Param('id') id: string) {
    return this.customTokensService.getCustomTokenById(id);
  }

  @Post('user/:userId')
  createCustomToken(
    @Param('themeId') themeId: string,
    @Param('userId') userId: string,
    @Body() createCustomTokenDto: CreateCustomTokenDto,
    @Req() req: any
  ) {
    const currentUserId = req.user.id;
    return this.customTokensService.createCustomToken(themeId, userId, createCustomTokenDto, currentUserId);
  }

  @Put(':id')
  updateCustomToken(
    @Param('id') id: string, 
    @Body() updateCustomTokenDto: CreateCustomTokenDto,
    @Req() req: any
  ) {
    const currentUserId = req.user.id;
    return this.customTokensService.updateCustomToken(id, updateCustomTokenDto, currentUserId);
  }

  @Delete(':id')
  deleteCustomToken(
    @Param('id') id: string,
    @Req() req: any
  ) {
    const currentUserId = req.user.id;
    return this.customTokensService.deleteCustomToken(id, currentUserId);
  }
}
