import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppStyleVariantsService } from './app-style-variants.service';
import { CreateAppStyleVariantDto } from './dto/create-app-style-variant.dto';
import { UpdateAppStyleVariantDto } from './dto/update-app-style-variant.dto';

@Controller('app-style-variants')
export class AppStyleVariantsController {
  constructor(private readonly appStyleVariantsService: AppStyleVariantsService) {}

  @Post()
  create(@Body() createAppStyleVariantDto: CreateAppStyleVariantDto) {
    return this.appStyleVariantsService.create(createAppStyleVariantDto);
  }

  @Get()
  findAll() {
    return this.appStyleVariantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appStyleVariantsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppStyleVariantDto: UpdateAppStyleVariantDto) {
    return this.appStyleVariantsService.update(+id, updateAppStyleVariantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appStyleVariantsService.remove(+id);
  }
}
