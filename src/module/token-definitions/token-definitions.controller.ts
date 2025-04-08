import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TokenDefinitionsService } from './token-definitions.service';
import { CreateTokenDefinitionDto } from './dto/create-token-definition.dto';
import { UpdateTokenDefinitionDto } from './dto/update-token-definition.dto';

@Controller('token-definitions')
export class TokenDefinitionsController {
  constructor(private readonly tokenDefinitionsService: TokenDefinitionsService) {}

  @Post()
  create(@Body() createTokenDefinitionDto: CreateTokenDefinitionDto) {
    return this.tokenDefinitionsService.create(createTokenDefinitionDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.tokenDefinitionsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tokenDefinitionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTokenDefinitionDto: UpdateTokenDefinitionDto) {
    return this.tokenDefinitionsService.update(id, updateTokenDefinitionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tokenDefinitionsService.remove(id);
  }
}
