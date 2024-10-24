import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { DefaultTokensService } from '../services/default-tokens.service';
import { DefaultToken } from '../entities/default-token.entity';
import { CreateDefaultTokenDto } from '../dto/create-default-token.dto';
import { UpdateDefaultTokenDto } from '../dto/update-default-token.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@Controller('catalogs/default-tokens')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
export class DefaultTokensController {
  constructor(private readonly defaultTokensService: DefaultTokensService) {}

  @Get()
  findAll(): Promise<DefaultToken[]> {
    return this.defaultTokensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<DefaultToken> {
    return this.defaultTokensService.findOne(id);
  }

  @Post()
  create(@Body() createDefaultTokenDto: CreateDefaultTokenDto): Promise<DefaultToken> {
    return this.defaultTokensService.create(createDefaultTokenDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDefaultTokenDto: UpdateDefaultTokenDto,
  ): Promise<DefaultToken> {
    return this.defaultTokensService.update(id, updateDefaultTokenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.defaultTokensService.remove(id);
  }
}
