import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DefaultTokensService } from './default-tokens.service';
import { CreateDefaultTokenDto } from './dto/create-default-token.dto';
import { UpdateDefaultTokenDto } from './dto/update-default-token.dto';

@Controller('default-tokens')
export class DefaultTokensController {
  constructor(private readonly defaultTokensService: DefaultTokensService) {}

  @Post()
  create(@Body() createDefaultTokenDto: CreateDefaultTokenDto) {
    return this.defaultTokensService.create(createDefaultTokenDto);
  }

  @Get()
  findAll() {
    return this.defaultTokensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.defaultTokensService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDefaultTokenDto: UpdateDefaultTokenDto) {
    return this.defaultTokensService.update(+id, updateDefaultTokenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.defaultTokensService.remove(+id);
  }
}
