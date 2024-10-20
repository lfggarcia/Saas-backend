import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { TranslationsService } from './translations.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('users/apps/:appId/languages/:langId/translations')
@UseGuards(JwtAuthGuard)
export class TranslationsController {
  constructor(private readonly translationsService: TranslationsService) {}

  @Get()
  getAllTranslations(@Param('langId') langId: string) {
    return this.translationsService.getAllTranslations(langId);
  }

  @Get(':id')
  getTranslationById(@Param('id') id: string) {
    return this.translationsService.getTranslationById(id);
  }

  @Post()
  createTranslation(@Param('langId') langId: string, @Body() createTranslationDto: any) {
    return this.translationsService.createTranslation(langId, createTranslationDto);
  }

  @Put(':id')
  updateTranslation(@Param('id') id: string, @Body() updateTranslationDto: any) {
    return this.translationsService.updateTranslation(id, updateTranslationDto);
  }

  @Delete(':id')
  deleteTranslation(@Param('id') id: string) {
    return this.translationsService.deleteTranslation(id);
  }
}
