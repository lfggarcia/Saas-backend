import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppTokensService } from './app-tokens.service';
import { CreateAppTokenDto } from './dto/create-app-token.dto';
import { UpdateAppTokenDto } from './dto/update-app-token.dto';

@Controller('app-tokens')
export class AppTokensController {
  constructor(private readonly appTokensService: AppTokensService) {}

  @Post()
  create(@Body() createAppTokenDto: CreateAppTokenDto) {
    return this.appTokensService.create(createAppTokenDto);
  }

  @Get()
  findAll() {
    return this.appTokensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appTokensService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppTokenDto: UpdateAppTokenDto) {
    return this.appTokensService.update(+id, updateAppTokenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appTokensService.remove(+id);
  }
}
