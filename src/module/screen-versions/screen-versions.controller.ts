import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ScreenVersionsService } from './screen-versions.service';
import { CreateScreenVersionDto } from './dto/create-screen-version.dto';
import { UpdateScreenVersionDto } from './dto/update-screen-version.dto';

@Controller('screen-versions')
export class ScreenVersionsController {
  constructor(private readonly screenVersionsService: ScreenVersionsService) {}

  @Post()
  create(@Body() createScreenVersionDto: CreateScreenVersionDto) {
    return this.screenVersionsService.create(createScreenVersionDto);
  }

  @Get()
  findAll(@Query() query: Partial<CreateScreenVersionDto>) {
    return this.screenVersionsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.screenVersionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScreenVersionDto: UpdateScreenVersionDto) {
    return this.screenVersionsService.update(id, updateScreenVersionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.screenVersionsService.remove(id);
  }
}
