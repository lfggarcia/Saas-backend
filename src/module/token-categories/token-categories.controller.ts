import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TokenCategoriesService } from './token-categories.service';
import { CreateTokenCategoryDto } from './dto/create-token-category.dto';
import { UpdateTokenCategoryDto } from './dto/update-token-category.dto';

@Controller('token-categories')
export class TokenCategoriesController {
  constructor(private readonly tokenCategoriesService: TokenCategoriesService) {}

  @Post()
  create(@Body() createTokenCategoryDto: CreateTokenCategoryDto) {
    return this.tokenCategoriesService.create(createTokenCategoryDto);
  }

  @Get()
  findAll(@Query() query: Partial<CreateTokenCategoryDto>) {
    return this.tokenCategoriesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tokenCategoriesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTokenCategoryDto: UpdateTokenCategoryDto) {
    return this.tokenCategoriesService.update(id, updateTokenCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tokenCategoriesService.remove(id);
  }
}
