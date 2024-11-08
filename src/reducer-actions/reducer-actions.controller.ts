import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { ReducerActionsService } from './reducer-actions.service';
import { CreateReducerActionDto } from './dto/create-reducer-action.dto';
import { UpdateReducerActionDto } from './dto/update-reducer-action.dto';

import { AuthGuard } from '@nestjs/passport';

@Controller('reducer-actions')
@UseGuards(AuthGuard('jwt'))
export class ReducerActionsController {
  constructor(private readonly reducerActionsService: ReducerActionsService) {}

  @Post()
  create(@Body() createReducerActionDto: CreateReducerActionDto, @Request() req) {
    const userId = req.user.id;
    return this.reducerActionsService.create(createReducerActionDto, userId);
  }

  @Get('reducer/:reducerId')
  findAllByReducer(@Param('reducerId') reducerId: string, @Request() req) {
    const userId = req.user.id;
    return this.reducerActionsService.findAllByReducer(reducerId, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.reducerActionsService.findOne(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReducerActionDto: UpdateReducerActionDto, @Request() req) {
    const userId = req.user.id;
    return this.reducerActionsService.update(id, updateReducerActionDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.reducerActionsService.remove(id, userId);
  }
}
