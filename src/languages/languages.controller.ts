import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('users/apps/:appId/languages')
@UseGuards(JwtAuthGuard)
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Get()
  getAllLanguages(@Param('appId') appId: string) {
    return this.languagesService.getAllLanguages(appId);
  }

  @Get(':id')
  getLanguageById(@Param('id') id: string) {
    return this.languagesService.getLanguageById(id);
  }

  @Post()
  createLanguage(@Param('appId') appId: string, @Body() createLanguageDto: any) {
    return this.languagesService.createLanguage(appId, createLanguageDto);
  }

  @Put(':id')
  updateLanguage(@Param('id') id: string, @Body() updateLanguageDto: any) {
    return this.languagesService.updateLanguage(id, updateLanguageDto);
  }

  @Delete(':id')
  deleteLanguage(@Param('id') id: string) {
    return this.languagesService.deleteLanguage(id);
  }
}
