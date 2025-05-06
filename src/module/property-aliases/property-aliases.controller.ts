import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertyAliasesService } from './property-aliases.service';
import { CreatePropertyAliasDto } from './dto/create-property-alias.dto';
import { UpdatePropertyAliasDto } from './dto/update-property-alias.dto';

@Controller('property-aliases')
export class PropertyAliasesController {
  constructor(private readonly propertyAliasesService: PropertyAliasesService) {}

  @Post()
  create(@Body() createPropertyAliasDto: CreatePropertyAliasDto) {
    return this.propertyAliasesService.create(createPropertyAliasDto);
  }

  @Get()
  findAll() {
    return this.propertyAliasesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyAliasesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyAliasDto: UpdatePropertyAliasDto) {
    return this.propertyAliasesService.update(+id, updatePropertyAliasDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyAliasesService.remove(+id);
  }
}
