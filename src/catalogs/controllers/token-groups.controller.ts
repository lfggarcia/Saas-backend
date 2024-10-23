import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { TokenGroupsService } from '../services/token-groups.service';
import { AuthGuard } from '@nestjs/passport';
import { TokenGroup } from '../entities/token-group.entity';
import { CreateTokenGroupDto } from '../dto/create-token-group.dto';
import { UpdateTokenGroupDto } from '../dto/update-token-group.dto';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@Controller('catalogs/token-groups')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('superadmin')
export class TokenGroupsController {
  constructor(private readonly tokenGroupsService: TokenGroupsService) {}

  @Get()
  findAll(): Promise<TokenGroup[]> {
    return this.tokenGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TokenGroup> {
    return this.tokenGroupsService.findOne(id);
  }

  @Post()
  create(@Body() createTokenGroupDto: CreateTokenGroupDto): Promise<TokenGroup> {
    return this.tokenGroupsService.create(createTokenGroupDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTokenGroupDto: UpdateTokenGroupDto): Promise<TokenGroup> {
    return this.tokenGroupsService.update(id, updateTokenGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tokenGroupsService.remove(id);
  }
}
