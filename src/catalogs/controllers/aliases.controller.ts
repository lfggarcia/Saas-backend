import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { AliasesService } from '../services/aliases.service';
import { Alias } from '../entities/alias.entity';
import { CreateAliasDto } from '../dto/create-alias.dto';
import { UpdateAliasDto } from '../dto/update-alias.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@Controller('catalogs/aliases')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('superadmin')
export class AliasesController {
  constructor(private readonly aliasesService: AliasesService) {}

  @Get()
  findAll(): Promise<Alias[]> {
    return this.aliasesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Alias> {
    return this.aliasesService.findOne(id);
  }

  @Post()
  create(@Body() createAliasDto: CreateAliasDto): Promise<Alias> {
    return this.aliasesService.create(createAliasDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAliasDto: UpdateAliasDto): Promise<Alias> {
    return this.aliasesService.update(id, updateAliasDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.aliasesService.remove(id);
  }
}
