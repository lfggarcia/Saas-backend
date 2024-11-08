import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { TranslationKeysService } from './translation-keys.service';
import { CreateTranslationKeyDto } from './dto/create-translation-key.dto';
import { UpdateTranslationKeyDto } from './dto/update-translation-key.dto';

import { AuthGuard } from '@nestjs/passport';

@Controller('translation-keys')
@UseGuards(AuthGuard('jwt'))
export class TranslationKeysController {
  constructor(private readonly translationKeysService: TranslationKeysService) {}

  @Post()
  create(@Body() createTranslationKeyDto: CreateTranslationKeyDto, @Request() req) {
    const userId = req.user.id;
    return this.translationKeysService.create(createTranslationKeyDto, userId);
  }

  @Get('application/:applicationId')
  findAllByApplication(@Param('applicationId') applicationId: string, @Request() req) {
    const userId = req.user.id;
    return this.translationKeysService.findAllByApplication(applicationId, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.translationKeysService.findOne(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTranslationKeyDto: UpdateTranslationKeyDto, @Request() req) {
    const userId = req.user.id;
    return this.translationKeysService.update(id, updateTranslationKeyDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.translationKeysService.remove(id, userId);
  }
}
