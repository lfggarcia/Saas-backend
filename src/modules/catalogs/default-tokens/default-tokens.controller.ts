import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/commons/guards/roles.guard';
import { DefaultTokensService } from './default-tokens.service';
import { Roles } from 'src/commons/decorators/roles.decorator';

@Controller('catalogs')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class DefaultTokensController {
	constructor(
		private readonly defaultTokensService: DefaultTokensService
	) {}

	@Get('default-tokens')
	async findAll(@Query() query: any) {
		return this.defaultTokensService.findAll(query);
	}

	@Get('default-tokens/:id')
	async findOne(@Param('id') id: string) {
		return this.defaultTokensService.findOne(id);
	}

	@Post('default-tokens')
	@Roles('admin')
	async create(@Query() query: any) {
		return this.defaultTokensService.create(query);
	}

	@Patch('default-tokens/:id')
	@Roles('admin')
	async update(@Param('id') id: string, @Body() data: any) {
		return this.defaultTokensService.update(id, data);
	}

	@Delete('default-tokens/:id')
	@Roles('admin')
	async remove(@Param('id') id: string) {
		return this.defaultTokensService.remove(id);
	}
}
