import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ValidationTypesService } from './validation-types.service';
import { RolesGuard } from '../../../commons/guards/roles.guard';
import { Roles } from 'src/commons/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('catalogs')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ValidationTypesController {
	constructor(
		private readonly validationTypesService: ValidationTypesService,
	) {}

	@Get('validation-types')
	async findAll(@Query() query: any) {
		return this.validationTypesService.findAll(query);
	}

	@Get('validation-types/:id')
	async findOne(@Param('id') id: string) {
		return this.validationTypesService.findOne(id);
	}

	@Post('validation-types')
	@Roles('admin')
	async create(@Body() data: any) {
		return this.validationTypesService.create(data);
	}

	@Patch('validation-types/:id')
	@Roles('admin')
	async update(@Param('id') id: string, @Body() data: any) {
		return this.validationTypesService.update(id, data);
	}

	@Delete('validation-types/:id')
	@Roles('admin')
	async remove(@Param('id') id: string) {
		return this.validationTypesService.remove(id);
	}
}
