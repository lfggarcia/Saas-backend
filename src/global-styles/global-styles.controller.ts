import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { GlobalStylesService } from './global-styles.service';
import { CreateGlobalStyleDto } from './dto/create-global-style.dto';
import { UpdateGlobalStyleDto } from './dto/update-global-style.dto';

import { AuthGuard } from '@nestjs/passport';

@Controller('global-styles')
@UseGuards(AuthGuard('jwt'))
export class GlobalStylesController {
  constructor(private readonly globalStylesService: GlobalStylesService) {}

  @Post()
  create(@Body() createGlobalStyleDto: CreateGlobalStyleDto, @Request() req) {
    const userId = req.user.id;
    return this.globalStylesService.create(createGlobalStyleDto, userId);
  }

  @Get('application/:applicationId')
  findAllByApplication(@Param('applicationId') applicationId: string, @Request() req) {
    const userId = req.user.id;
    return this.globalStylesService.findAllByApplication(applicationId, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.globalStylesService.findOne(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGlobalStyleDto: UpdateGlobalStyleDto, @Request() req) {
    const userId = req.user.id;
    return this.globalStylesService.update(id, updateGlobalStyleDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.globalStylesService.remove(id, userId);
  }
}
