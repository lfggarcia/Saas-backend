import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserTranslationsService } from './user-translations.service';
import { CreateUserTranslationDto } from './dto/create-user-translation.dto';
import { UpdateUserTranslationDto } from './dto/update-user-translation.dto';

@Controller('user-translations')
export class UserTranslationsController {
  constructor(private readonly userTranslationsService: UserTranslationsService) {}

  @Post()
  create(@Body() createUserTranslationDto: CreateUserTranslationDto) {
    return this.userTranslationsService.create(createUserTranslationDto);
  }

  @Get()
  findAll(@Query() query: Partial<CreateUserTranslationDto>) {
    return this.userTranslationsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userTranslationsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserTranslationDto: UpdateUserTranslationDto) {
    return this.userTranslationsService.update(id, updateUserTranslationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userTranslationsService.remove(id);
  }
}
