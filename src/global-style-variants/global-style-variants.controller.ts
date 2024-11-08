import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { GlobalStyleVariantsService } from './global-style-variants.service';
import { CreateGlobalStyleVariantDto } from './dto/create-global-style-variant.dto';
import { UpdateGlobalStyleVariantDto } from './dto/update-global-style-variant.dto';

import { AuthGuard } from '@nestjs/passport';

@Controller('global-style-variants')
@UseGuards(AuthGuard('jwt'))
export class GlobalStyleVariantsController {
  constructor(private readonly variantsService: GlobalStyleVariantsService) {}

  @Post()
  create(@Body() createVariantDto: CreateGlobalStyleVariantDto, @Request() req) {
    const userId = req.user.id;
    return this.variantsService.create(createVariantDto, userId);
  }

  @Get('global-style/:globalStyleId')
  findAllByGlobalStyle(@Param('globalStyleId') globalStyleId: string, @Request() req) {
    const userId = req.user.id;
    return this.variantsService.findAllByGlobalStyle(globalStyleId, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.variantsService.findOne(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVariantDto: UpdateGlobalStyleVariantDto, @Request() req) {
    const userId = req.user.id;
    return this.variantsService.update(id, updateVariantDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.variantsService.remove(id, userId);
  }
}
