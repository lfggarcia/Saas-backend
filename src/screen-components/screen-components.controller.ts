import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { ScreenComponentsService } from './screen-components.service';
import { CreateScreenComponentDto } from './dto/create-screen-component.dto';
import { UpdateScreenComponentDto } from './dto/update-screen-component.dto';

import { AuthGuard } from '@nestjs/passport';

@Controller('screen-components')
@UseGuards(AuthGuard('jwt'))
export class ScreenComponentsController {
  constructor(private readonly screenComponentsService: ScreenComponentsService) {}

  @Post()
  create(@Body() createScreenComponentDto: CreateScreenComponentDto, @Request() req) {
    const userId = req.user.id;
    return this.screenComponentsService.create(createScreenComponentDto, userId);
  }

  @Get('screen-version/:screenVersionId')
  findAllByScreenVersion(@Param('screenVersionId') screenVersionId: string, @Request() req) {
    const userId = req.user.id;
    return this.screenComponentsService.findAllByScreenVersion(screenVersionId, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.screenComponentsService.findOne(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScreenComponentDto: UpdateScreenComponentDto, @Request() req) {
    const userId = req.user.id;
    return this.screenComponentsService.update(id, updateScreenComponentDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.screenComponentsService.remove(id, userId);
  }
}
