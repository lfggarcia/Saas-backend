import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { ScreensService } from './screens.service';
import { CreateScreenDto } from './dto/create-screen.dto';
import { UpdateScreenDto } from './dto/update-screen.dto';

import { AuthGuard } from '@nestjs/passport';

@Controller('screens')
@UseGuards(AuthGuard('jwt'))
export class ScreensController {
  constructor(private readonly screensService: ScreensService) {}

  @Post()
  create(@Body() createScreenDto: CreateScreenDto, @Request() req) {
    const userId = req.user.id;
    return this.screensService.create(createScreenDto, userId);
  }

  @Get()
  findAll(@Request() req) {
    const userId = req.user.id;
    return this.screensService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.screensService.findOne(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScreenDto: UpdateScreenDto, @Request() req) {
    const userId = req.user.id;
    return this.screensService.update(id, updateScreenDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.screensService.remove(id, userId);
  }
}
