import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GlobalStyleVariantTypesService } from './global-style-variant-types.service';
import { CreateGlobalStyleVariantTypeDto } from './dto/create-global-style-variant-type.dto';
import { UpdateGlobalStyleVariantTypeDto } from './dto/update-global-style-variant-type.dto';

@Controller('global-style-variant-types')
export class GlobalStyleVariantTypesController {
  constructor(private readonly globalStyleVariantTypesService: GlobalStyleVariantTypesService) {}

  @Post()
  create(@Body() createGlobalStyleVariantTypeDto: CreateGlobalStyleVariantTypeDto) {
    return this.globalStyleVariantTypesService.create(createGlobalStyleVariantTypeDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.globalStyleVariantTypesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.globalStyleVariantTypesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGlobalStyleVariantTypeDto: UpdateGlobalStyleVariantTypeDto) {
    return this.globalStyleVariantTypesService.update(id, updateGlobalStyleVariantTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.globalStyleVariantTypesService.remove(id);
  }
}
