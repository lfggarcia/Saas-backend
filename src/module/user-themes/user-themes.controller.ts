import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserThemesService } from './user-themes.service';
import { CreateUserThemeDto } from './dto/create-user-theme.dto';
import { UpdateUserThemeDto } from './dto/update-user-theme.dto';

@Controller('user-themes')
export class UserThemesController {
  constructor(private readonly userThemesService: UserThemesService) {}

  @Post()
  create(@Body() createUserThemeDto: CreateUserThemeDto) {
    return this.userThemesService.create(createUserThemeDto);
  }

  @Get()
  findAll(@Query() query: Partial<CreateUserThemeDto>) {
    return this.userThemesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userThemesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserThemeDto: UpdateUserThemeDto) {
    return this.userThemesService.update(id, updateUserThemeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userThemesService.remove(id);
  }
}
