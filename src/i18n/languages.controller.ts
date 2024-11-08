import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';

import { AuthGuard } from '@nestjs/passport';

@Controller('languages')
@UseGuards(AuthGuard('jwt'))
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Post()
  create(@Body() createLanguageDto: CreateLanguageDto, @Request() req) {
    const userId = req.user.id;
    return this.languagesService.create(createLanguageDto, userId);
  }

  @Get('application/:applicationId')
  findAllByApplication(@Param('applicationId') applicationId: string, @Request() req) {
    const userId = req.user.id;
    return this.languagesService.findAllByApplication(applicationId, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.languagesService.findOne(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLanguageDto: UpdateLanguageDto, @Request() req) {
    const userId = req.user.id;
    return this.languagesService.update(id, updateLanguageDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.languagesService.remove(id, userId);
  }
}
