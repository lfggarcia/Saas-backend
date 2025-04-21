import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserGlobalStylesService } from './user-global-styles.service';
import { CreateUserGlobalStyleDto } from './dto/create-user-global-style.dto';
import { UpdateUserGlobalStyleDto } from './dto/update-user-global-style.dto';

@Controller('user-global-styles')
export class UserGlobalStylesController {
  constructor(private readonly userGlobalStylesService: UserGlobalStylesService) {}

  @Post()
  create(@Body() createUserGlobalStyleDto: CreateUserGlobalStyleDto) {
    return this.userGlobalStylesService.create(createUserGlobalStyleDto);
  }

  @Get()
  findAll(@Query() query: Partial<CreateUserGlobalStyleDto>) {
    return this.userGlobalStylesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userGlobalStylesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserGlobalStyleDto: UpdateUserGlobalStyleDto) {
    return this.userGlobalStylesService.update(id, updateUserGlobalStyleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userGlobalStylesService.remove(id);
  }
}
