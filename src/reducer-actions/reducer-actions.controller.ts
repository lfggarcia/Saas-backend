import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { ReducerActionsService } from './reducer-actions.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CreateReducerActionDto } from './dto/create-reducer-action.dto/create-reducer-action.dto';

@Controller('users/apps/:appId/store/:storeId/reducers/:reducerId/actions')
@UseGuards(JwtAuthGuard)
export class ReducerActionsController {
  constructor(private readonly reducerActionsService: ReducerActionsService) {}

  @Get()
  getAllReducerActions(@Param('reducerId') reducerId: string) {
    return this.reducerActionsService.getAllReducerActions(reducerId);
  }

  @Get(':id')
  getReducerActionById(@Param('id') id: string) {
    return this.reducerActionsService.getReducerActionById(id);
  }

  @Post()
  createReducerAction(
    @Param('reducerId') reducerId: string,
    @Body() createReducerActionDto: CreateReducerActionDto,
    @Req() req: any
  ) {
    const userId = req.user.id;
    return this.reducerActionsService.createReducerAction(reducerId, createReducerActionDto, userId);
  }

  @Put(':id')
  updateReducerAction(
    @Param('id') id: string,
    @Body() updateReducerActionDto: CreateReducerActionDto,
    @Req() req: any
  ) {
    const userId = req.user.id;
    return this.reducerActionsService.updateReducerAction(id, updateReducerActionDto, userId);
  }

  @Delete(':id')
  deleteReducerAction(
    @Param('id') id: string,
    @Req() req: any
  ) {
    const userId = req.user.id;
    return this.reducerActionsService.deleteReducerAction(id, userId);
  }
}
