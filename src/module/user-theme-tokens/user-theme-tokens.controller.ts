import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserThemeTokensService } from './user-theme-tokens.service';
import { CreateUserThemeTokenDto } from './dto/create-user-theme-token.dto';
import { UpdateUserThemeTokenDto } from './dto/update-user-theme-token.dto';

@Controller('user-theme-tokens')
export class UserThemeTokensController {
  constructor(private readonly userThemeTokensService: UserThemeTokensService) {}

  @Post()
  create(@Body() createUserThemeTokenDto: CreateUserThemeTokenDto) {
    return this.userThemeTokensService.create(createUserThemeTokenDto);
  }

  @Get()
  findAll(@Query() query: Partial<CreateUserThemeTokenDto>) {
    return this.userThemeTokensService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userThemeTokensService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserThemeTokenDto: UpdateUserThemeTokenDto) {
    return this.userThemeTokensService.update(id, updateUserThemeTokenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userThemeTokensService.remove(id);
  }
}
