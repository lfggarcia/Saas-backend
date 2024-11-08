import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { TranslationValuesService } from './translation-values.service';
import { CreateTranslationValueDto } from './dto/create-translation-value.dto';
import { UpdateTranslationValueDto } from './dto/update-translation-value.dto';

import { AuthGuard } from '@nestjs/passport';

@Controller('translation-values')
@UseGuards(AuthGuard('jwt'))
export class TranslationValuesController {
  constructor(private readonly translationValuesService: TranslationValuesService) {}

  @Post()
  create(@Body() createTranslationValueDto: CreateTranslationValueDto, @Request() req) {
    const userId = req.user.id;
    return this.translationValuesService.create(createTranslationValueDto, userId);
  }

  @Get('translation-key/:translationKeyId')
  findAllByTranslationKey(@Param('translationKeyId') translationKeyId: string, @Request() req) {
    const userId = req.user.id;
    return this.translationValuesService.findAllByTranslationKey(translationKeyId, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.translationValuesService.findOne(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTranslationValueDto: UpdateTranslationValueDto, @Request() req) {
    const userId = req.user.id;
    return this.translationValuesService.update(id, updateTranslationValueDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.translationValuesService.remove(id, userId);
  }
}
