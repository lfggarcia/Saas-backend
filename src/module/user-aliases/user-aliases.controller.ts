import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserAliasesService } from './user-aliases.service';
import { CreateUserAliasDto } from './dto/create-user-alias.dto';
import { UpdateUserAliasDto } from './dto/update-user-alias.dto';

@Controller('user-aliases')
export class UserAliasesController {
  constructor(private readonly userAliasesService: UserAliasesService) {}

  @Post()
  create(@Body() createUserAliasDto: CreateUserAliasDto) {
    return this.userAliasesService.create(createUserAliasDto);
  }

  @Get()
  findAll(@Query() query: Partial<CreateUserAliasDto>) {
    return this.userAliasesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAliasesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserAliasDto: UpdateUserAliasDto) {
    return this.userAliasesService.update(id, updateUserAliasDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAliasesService.remove(id);
  }
}
