import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NavigationTypesService } from './navigation-types.service';
import { CreateNavigationTypeDto } from './dto/create-navigation-type.dto';
import { UpdateNavigationTypeDto } from './dto/update-navigation-type.dto';

@Controller('navigation-types')
export class NavigationTypesController {
  constructor(private readonly navigationTypesService: NavigationTypesService) {}

  @Post()
  create(@Body() createNavigationTypeDto: CreateNavigationTypeDto) {
    return this.navigationTypesService.create(createNavigationTypeDto);
  }

  @Get()
  findAll(@Query() query: Partial<CreateNavigationTypeDto>) {
    return this.navigationTypesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.navigationTypesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNavigationTypeDto: UpdateNavigationTypeDto) {
    return this.navigationTypesService.update(id, updateNavigationTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.navigationTypesService.remove(id);
  }
}
