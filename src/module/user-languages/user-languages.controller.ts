import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserLanguagesService } from './user-languages.service';
import { CreateUserLanguageDto } from './dto/create-user-language.dto';
import { UpdateUserLanguageDto } from './dto/update-user-language.dto';

@Controller('user-languages')
export class UserLanguagesController {
  constructor(private readonly userLanguagesService: UserLanguagesService) {}

  @Post()
  create(@Body() createUserLanguageDto: CreateUserLanguageDto) {
    return this.userLanguagesService.create(createUserLanguageDto);
  }

  @Get()
  findAll(@Query() query: Partial<CreateUserLanguageDto>) {
    return this.userLanguagesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userLanguagesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserLanguageDto: UpdateUserLanguageDto) {
    return this.userLanguagesService.update(id, updateUserLanguageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userLanguagesService.remove(id);
  }
}
