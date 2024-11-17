import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AliasesService } from './aliases.service';
import { RolesGuard } from '../../../commons/guards/roles.guard';
import { Roles } from 'src/commons/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('catalogs')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AliasesController {
	constructor(
		private readonly aliasesService: AliasesService,
	) {}

	@Get('aliases')
	async findAll(@Query() query: any) {
		return this.aliasesService.findAll(query);
	}

	@Get('aliases/:id')
	async findOne(id: string) {
		return this.aliasesService.findOne(id);
	}

	@Post('aliases')
	@Roles('admin')
	async create(@Body() data: any) {
		return this.aliasesService.create(data);
	}

	@Patch('aliases/:id')
	@Roles('admin')
	async update(@Param('id') id: string, @Body() data: any) {
		return this.aliasesService.update(id, data);
	}

	@Delete('aliases/:id')
	@Roles('admin')
	async remove(@Param('id') id: string) {
		return this.aliasesService.remove(id);
	}
}
