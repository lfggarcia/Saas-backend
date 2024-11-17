import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { RolesGuard } from '../../../commons/guards/roles.guard';
import { Roles } from 'src/commons/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('catalogs')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class StatusesController {
	constructor(
		private readonly statusesService: StatusesService,
	) {}

	@Get('statuses')
	async findAll(@Query() query: any) {
		return this.statusesService.findAll(query);
	}

	@Get('statuses/:id')
	async findOne(@Param('id') id: string) {
		return this.statusesService.findOne(id);
	}

	@Post('statuses')
	@Roles('admin')
	async create(@Body() data: any) {
		return this.statusesService.create(data);
	}

	@Patch('statuses/:id')
	@Roles('admin')
	async update(@Param('id') id: string, @Body() data: any) {
		return this.statusesService.update(id, data);
	}

	@Delete('statuses/:id')
	@Roles('admin')
	async remove(@Param('id') id: string) {
		return this.statusesService.remove(id);
	}
}
