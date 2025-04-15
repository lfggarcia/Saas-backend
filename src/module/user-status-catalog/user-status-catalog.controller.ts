import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserStatusCatalogService } from './user-status-catalog.service';
import { CreateUserStatusCatalogDto } from './dto/create-user-status-catalog.dto';
import { UpdateUserStatusCatalogDto } from './dto/update-user-status-catalog.dto';

@Controller('user-status-catalog')
export class UserStatusCatalogController {
  constructor(private readonly userStatusCatalogService: UserStatusCatalogService) {}

  @Post()
  create(@Body() createUserStatusCatalogDto: CreateUserStatusCatalogDto) {
    return this.userStatusCatalogService.create(createUserStatusCatalogDto);
  }

  @Get()
  findAll(@Query() query: Partial<CreateUserStatusCatalogDto>) {
    return this.userStatusCatalogService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userStatusCatalogService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserStatusCatalogDto: UpdateUserStatusCatalogDto) {
    return this.userStatusCatalogService.update(id, updateUserStatusCatalogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userStatusCatalogService.remove(id);
  }
}
