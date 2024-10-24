import { Controller, Get, Post, Body, Param, Delete, UseGuards, Patch } from '@nestjs/common';
import { TokenGroupAliasesService } from '../services/token-group-aliases.service';
import { TokenGroupAlias } from '../entities/token-group-alias.entity';
import { CreateTokenGroupAliasDto } from '../dto/create-token-group-alias.dto';
import { UpdateTokenGroupAliasDto } from '../dto/update-token-group-alias.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@Controller('catalogs/token-group-aliases')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
export class TokenGroupAliasesController {
  constructor(private readonly tokenGroupAliasesService: TokenGroupAliasesService) {}

  @Get()
  findAll(): Promise<TokenGroupAlias[]> {
    return this.tokenGroupAliasesService.findAll();
  }

  @Post()
  create(@Body() createTokenGroupAliasDto: CreateTokenGroupAliasDto): Promise<TokenGroupAlias> {
    return this.tokenGroupAliasesService.create(createTokenGroupAliasDto);
  }

	@Patch(':token_group_id/:alias_id')
	update(
		@Param('token_group_id') token_group_id: string,
		@Param('alias_id') alias_id: string,
		@Body() updateTokenGroupAliasDto: UpdateTokenGroupAliasDto,
	): Promise<TokenGroupAlias> {
		return this.tokenGroupAliasesService.update(token_group_id, alias_id, updateTokenGroupAliasDto);
	}

  @Delete(':token_group_id/:alias_id')
  remove(
    @Param('token_group_id') token_group_id: string,
    @Param('alias_id') alias_id: string,
  ): Promise<void> {
    return this.tokenGroupAliasesService.remove(token_group_id, alias_id);
  }
}
