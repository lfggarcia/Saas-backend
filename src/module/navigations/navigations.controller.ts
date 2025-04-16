import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NavigationsService } from './navigations.service';
import { CreateNavigationDto } from './dto/create-navigation.dto';
import { UpdateNavigationDto } from './dto/update-navigation.dto';

@Controller('navigations')
export class NavigationsController {
  constructor(private readonly navigationsService: NavigationsService) {}

  @Post()
  create(@Body() createNavigationDto: CreateNavigationDto) {
    return this.navigationsService.create(createNavigationDto);
  }

  @Get()
  findAll(@Query() query: Partial<CreateNavigationDto>) {
    return this.navigationsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.navigationsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNavigationDto: UpdateNavigationDto) {
    return this.navigationsService.update(id, updateNavigationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.navigationsService.remove(id);
  }
}
