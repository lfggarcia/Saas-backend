import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StyleAliasesService } from './style-aliases.service';
import { CreateStyleAliasDto } from './dto/create-style-alias.dto';
import { UpdateStyleAliasDto } from './dto/update-style-alias.dto';

@Controller('style-aliases')
export class StyleAliasesController {
  constructor(private readonly styleAliasesService: StyleAliasesService) {}

  @Post()
  create(@Body() createStyleAliasDto: CreateStyleAliasDto) {
    return this.styleAliasesService.create(createStyleAliasDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.styleAliasesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.styleAliasesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStyleAliasDto: UpdateStyleAliasDto) {
    return this.styleAliasesService.update(id, updateStyleAliasDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.styleAliasesService.remove(id);
  }
}
