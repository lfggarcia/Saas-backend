import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TokenStylesService } from './token-styles.service';
import { CreateTokenStyleDto } from './dto/create-token-style.dto';
import { UpdateTokenStyleDto } from './dto/update-token-style.dto';

@Controller('token-styles')
export class TokenStylesController {
  constructor(private readonly tokenStylesService: TokenStylesService) {}

  @Post()
  create(@Body() createTokenStyleDto: CreateTokenStyleDto) {
    return this.tokenStylesService.create(createTokenStyleDto);
  }

  @Get()
  findAll(@Query() query: Partial<CreateTokenStyleDto>) {
    return this.tokenStylesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tokenStylesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTokenStyleDto: UpdateTokenStyleDto) {
    return this.tokenStylesService.update(id, updateTokenStyleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tokenStylesService.remove(id);
  }
}
