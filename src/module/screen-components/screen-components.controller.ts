import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ScreenComponentsService } from './screen-components.service';
import { CreateScreenComponentDto } from './dto/create-screen-component.dto';
import { UpdateScreenComponentDto } from './dto/update-screen-component.dto';

@Controller('screen-components')
export class ScreenComponentsController {
  constructor(private readonly screenComponentsService: ScreenComponentsService) {}

  @Post()
  create(@Body() createScreenComponentDto: CreateScreenComponentDto) {
    return this.screenComponentsService.create(createScreenComponentDto);
  }

  @Get()
  findAll(@Query() query: Partial<CreateScreenComponentDto>) {
    return this.screenComponentsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.screenComponentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScreenComponentDto: UpdateScreenComponentDto) {
    return this.screenComponentsService.update(id, updateScreenComponentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.screenComponentsService.remove(id);
  }
}
