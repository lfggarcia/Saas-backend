import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StyleVariantsService } from './style-variants.service';
import { CreateStyleVariantDto } from './dto/create-style-variant.dto';
import { UpdateStyleVariantDto } from './dto/update-style-variant.dto';

@Controller('style-variants')
export class StyleVariantsController {
  constructor(private readonly styleVariantsService: StyleVariantsService) {}

  @Post()
  create(@Body() createStyleVariantDto: CreateStyleVariantDto) {
    return this.styleVariantsService.create(createStyleVariantDto);
  }

  @Get()
  findAll() {
    return this.styleVariantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.styleVariantsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStyleVariantDto: UpdateStyleVariantDto) {
    return this.styleVariantsService.update(+id, updateStyleVariantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.styleVariantsService.remove(+id);
  }
}
