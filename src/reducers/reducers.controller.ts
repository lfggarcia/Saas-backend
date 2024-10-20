import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { ReducersService } from './reducers.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CreateReducerDto } from './dto/create-reducer.dto/create-reducer.dto';

@Controller('users/apps/:appId/store/:storeId/reducers')
@UseGuards(JwtAuthGuard)
export class ReducersController {
  constructor(private readonly reducersService: ReducersService) {}

  @Get()
  getAllReducers(@Param('storeId') storeId: string) {
    return this.reducersService.getAllReducers(storeId);
  }

  @Get(':id')
  getReducerById(@Param('id') id: string) {
    return this.reducersService.getReducerById(id);
  }

  @Post()
  createReducer(
    @Param('storeId') storeId: string,
    @Body() createReducerDto: CreateReducerDto,
    @Req() req: any
  ) {
    const userId = req.user.id;
    return this.reducersService.createReducer(storeId, createReducerDto, userId);
  }

  @Put(':id')
  updateReducer(
    @Param('id') id: string, 
    @Body() updateReducerDto: CreateReducerDto,
    @Req() req: any
  ) {
    const userId = req.user.id;
    return this.reducersService.updateReducer(id, updateReducerDto, userId);
  }

  @Delete(':id')
  deleteReducer(
    @Param('id') id: string,
    @Req() req: any
  ) {
    const userId = req.user.id;
    return this.reducersService.deleteReducer(id, userId);
  }
}
