import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { TokenGroupAliasesService } from './token-group-aliases.service';
import { RolesGuard } from '../../../commons/guards/roles.guard';
import { Roles } from 'src/commons/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('catalogs')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class TokenGroupAliasesController {
	constructor(
		private readonly tokenGroupAliasesService: TokenGroupAliasesService,
	) {}

	@Get('token-group-aliases')
	async findAll(@Query() query: any) {
		return this.tokenGroupAliasesService.findAll(query);
	}

	@Get('token-group-aliases/:id')
	async findOne(@Param('id') id: string) {
		return this.tokenGroupAliasesService.findOne(id);
	}

	@Post('token-group-aliases')
	@Roles('admin')
	async create(@Body() data: any) {
		return this.tokenGroupAliasesService.create(data);
	}

	@Patch('token-group-aliases/:id')
	@Roles('admin')
	async update(@Param('id') id: string, @Body() data: any) {
		return this.tokenGroupAliasesService.update(id, data);
	}

	@Delete('token-group-aliases/:id')
	@Roles('admin')
	async remove(@Param('id') id: string) {
		return this.tokenGroupAliasesService.remove(id);
	}
}
