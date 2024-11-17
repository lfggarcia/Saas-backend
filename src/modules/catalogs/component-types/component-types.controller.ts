import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../../commons/guards/roles.guard';
import { Roles } from 'src/commons/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ComponentTypesService } from './component-types.service';

@Controller('catalogs')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ComponentTypesController {
	constructor(
		private readonly componentTypesService: ComponentTypesService,
	) {}

	@Get('component-types')
	async findAll(@Query() query: any) {
		return this.componentTypesService.findAll(query);
	}

	@Get('component-types/:id')
	async findOne(id: string) {
		return this.componentTypesService.findOne(id);
	}

	@Post('component-types')
	@Roles('admin')
	async create(@Body() data: any) {
		return this.componentTypesService.create(data);
	}

	@Patch('component-types/:id')
	@Roles('admin')
	async update(@Param('id') id: string, @Body() data: any) {
		return this.componentTypesService.update(id, data);
	}

	@Delete('component-types/:id')
	@Roles('admin')
	async remove(@Param('id') id: string) {
		return this.componentTypesService.remove(id);
	}
}
