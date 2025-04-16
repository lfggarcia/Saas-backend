import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TranslationKeysService } from './translation-keys.service';
import { CreateTranslationKeyDto } from './dto/create-translation-key.dto';
import { UpdateTranslationKeyDto } from './dto/update-translation-key.dto';

@Controller('translation-keys')
export class TranslationKeysController {
  constructor(private readonly translationKeysService: TranslationKeysService) {}

  @Post()
  create(@Body() createTranslationKeyDto: CreateTranslationKeyDto) {
    return this.translationKeysService.create(createTranslationKeyDto);
  }

  @Get()
  findAll(@Query() query: Partial<CreateTranslationKeyDto>) {
    return this.translationKeysService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.translationKeysService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTranslationKeyDto: UpdateTranslationKeyDto) {
    return this.translationKeysService.update(id, updateTranslationKeyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.translationKeysService.remove(id);
  }
}
