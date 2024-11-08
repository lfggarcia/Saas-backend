import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { ReducersService } from './reducers.service';
import { CreateReducerDto } from './dto/create-reducer.dto';
import { UpdateReducerDto } from './dto/update-reducer.dto';

import { AuthGuard } from '@nestjs/passport';

@Controller('reducers')
@UseGuards(AuthGuard('jwt'))
export class ReducersController {
  constructor(private readonly reducersService: ReducersService) {}

  @Post()
  create(@Body() createReducerDto: CreateReducerDto, @Request() req) {
    const userId = req.user.id;
    return this.reducersService.create(createReducerDto, userId);
  }

  @Get('store/:storeId')
  findAllByStore(@Param('storeId') storeId: string, @Request() req) {
    const userId = req.user.id;
    return this.reducersService.findAllByStore(storeId, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.reducersService.findOne(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReducerDto: UpdateReducerDto, @Request() req) {
    const userId = req.user.id;
    return this.reducersService.update(id, updateReducerDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.reducersService.remove(id, userId);
  }
}
