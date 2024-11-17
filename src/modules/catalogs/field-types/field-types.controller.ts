import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { FieldTypesService } from './field-types.service';
import { RolesGuard } from '../../../commons/guards/roles.guard';
import { Roles } from 'src/commons/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('catalogs')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class FieldTypesController {
	constructor(
		private readonly fieldTypesService: FieldTypesService,
	) {}

	@Get('field-types')
	async findAll(@Query() query: any) {
		return this.fieldTypesService.findAll(query);
	}

	@Get('field-types/:id')
	async findOne(id: string) {
		return this.fieldTypesService.findOne(id);
	}

	@Post('field-types')
	@Roles('admin')
	async create(@Body() data: any) {
		return this.fieldTypesService.create(data);
	}

	@Patch('field-types/:id')
	@Roles('admin')
	async update(@Param('id') id: string, @Body() data: any) {
		return this.fieldTypesService.update(id, data);
	}

	@Delete('field-types/:id')
	@Roles('admin')
	async remove(@Param('id') id: string) {
		return this.fieldTypesService.remove(id);
	}
}
