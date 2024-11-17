import { Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/commons/guards/roles.guard';
import { TokenGroupsService } from './token-groups.service';
import { Roles } from 'src/commons/decorators/roles.decorator';

@Controller('catalogs')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class TokenGroupsController {
	constructor(
		private readonly tokenGroupsService: TokenGroupsService,
	) {}

	@Get('token-groups')
	async findAll(@Query() query: any) {
		return this.tokenGroupsService.findAll(query);
	}

	@Get('token-groups/:id')
	async findOne(@Param('id') id: string) {
		return this.tokenGroupsService.findOne(id);
	}

	@Post('token-groups')
	@Roles('admin')
	async create(@Query() query: any) {
		return this.tokenGroupsService.create(query);
	}

	@Patch('token-groups/:id')
	@Roles('admin')
	async update(@Param('id') id: string,@Query() query: any) {
		return this.tokenGroupsService.update(id, query);
	}

	@Delete('token-groups/:id')
	@Roles('admin')
	async remove(@Param('id') id: string) {
		return this.tokenGroupsService.remove(id);
	}
}
