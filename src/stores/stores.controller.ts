import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

import { AuthGuard } from '@nestjs/passport';

@Controller('stores')
@UseGuards(AuthGuard('jwt'))
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  create(@Body() createStoreDto: CreateStoreDto, @Request() req) {
    const userId = req.user.id;
    return this.storesService.create(createStoreDto, userId);
  }

  @Get('application/:applicationId')
  findAllByApplication(@Param('applicationId') applicationId: string, @Request() req) {
    const userId = req.user.id;
    return this.storesService.findAllByApplication(applicationId, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.storesService.findOne(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto, @Request() req) {
    const userId = req.user.id;
    return this.storesService.update(id, updateStoreDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.storesService.remove(id, userId);
  }
}
