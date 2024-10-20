import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { StoresService } from './stores.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CreateStoreDto } from './dto/create-store.dto/create-store.dto';

@Controller('users/apps/:appId/store')
@UseGuards(JwtAuthGuard)
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  getStoreByAppId(@Param('appId') appId: string) {
    return this.storesService.getStoreByAppId(appId);
  }

  @Post()
  createStore(
    @Param('appId') appId: string,
    @Body() createStoreDto: CreateStoreDto,
    @Req() req: any
  ) {
    const userId = req.user.id;
    return this.storesService.createStore(appId, createStoreDto, userId);
  }

  @Put(':id')
  updateStore(
    @Param('id') id: string, 
    @Body() updateStoreDto: CreateStoreDto,
    @Req() req: any
  ) {
    const userId = req.user.id;
    return this.storesService.updateStore(id, updateStoreDto, userId);
  }

  @Delete(':id')
  deleteStore(
    @Param('id') id: string,
    @Req() req: any
  ) {
    const userId = req.user.id;
    return this.storesService.deleteStore(id, userId);
  }
}
