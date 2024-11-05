import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { CustomTokensService } from './custom-tokens.service';
import { CreateCustomTokenDto } from './dto/create-custom-token.dto';
import { UpdateCustomTokenDto } from './dto/update-custom-token.dto';

import { AuthGuard } from '@nestjs/passport';

@Controller('custom-tokens')
@UseGuards(AuthGuard('jwt'))
export class CustomTokensController {
  constructor(private readonly customTokensService: CustomTokensService) {}

  @Post()
  create(@Body() createCustomTokenDto: CreateCustomTokenDto, @Request() req) {
    const userId = req.user.id;
    return this.customTokensService.create(createCustomTokenDto, userId);
  }

  @Get('theme/:themeId')
  findAllByTheme(@Param('themeId') themeId: string, @Request() req) {
    const userId = req.user.id;
    return this.customTokensService.findAllByTheme(themeId, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.customTokensService.findOne(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomTokenDto: UpdateCustomTokenDto, @Request() req) {
    const userId = req.user.id;
    return this.customTokensService.update(id, updateCustomTokenDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.customTokensService.remove(id, userId);
  }
}
