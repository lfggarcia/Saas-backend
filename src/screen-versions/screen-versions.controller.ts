import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { ScreenVersionsService } from './screen-versions.service';
import { CreateScreenVersionDto } from './dto/create-screen-version.dto';
import { UpdateScreenVersionDto } from './dto/update-screen-version.dto';

import { AuthGuard } from '@nestjs/passport';

@Controller('screen-versions')
@UseGuards(AuthGuard('jwt'))
export class ScreenVersionsController {
  constructor(private readonly screenVersionsService: ScreenVersionsService) {}

  @Post()
  create(@Body() createScreenVersionDto: CreateScreenVersionDto, @Request() req) {
    const userId = req.user.id;
    return this.screenVersionsService.create(createScreenVersionDto, userId);
  }

  @Get('screen/:screenId')
  findAllByScreen(@Param('screenId') screenId: string, @Request() req) {
    const userId = req.user.id;
    return this.screenVersionsService.findAllByScreen(screenId, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.screenVersionsService.findOne(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScreenVersionDto: UpdateScreenVersionDto, @Request() req) {
    const userId = req.user.id;
    return this.screenVersionsService.update(id, updateScreenVersionDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.screenVersionsService.remove(id, userId);
  }
}
