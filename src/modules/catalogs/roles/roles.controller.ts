import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesGuard } from '../../../commons/guards/roles.guard';
import { Roles } from 'src/commons/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('catalogs')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
export class RolesController {
	constructor(
		private readonly rolesService: RolesService,
	) {}

	@Get('roles')
	async findAll(@Query() query: any) {
		return this.rolesService.findAll(query);
	}

	@Get('roles/:id')
	async findOne(id: string) {
		return this.rolesService.findOne(id);
	}

	@Post('roles')
	async create(@Body() data: any) {
		return this.rolesService.create(data);
	}

	@Patch('roles/:id')
	async update(@Param('id') id: string, @Body() data: any) {
		return this.rolesService.update(id, data);
	}

	@Delete('roles/:id')
	async remove(@Param('id') id: string) {
		return this.rolesService.remove(id);
	}
}
