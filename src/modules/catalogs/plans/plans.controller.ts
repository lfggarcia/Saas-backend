import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { PlansService } from './plans.service';
import { RolesGuard } from '../../../commons/guards/roles.guard';
import { Roles } from 'src/commons/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('catalogs')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
export class PlansController {
	constructor(
		private readonly plansService: PlansService,
	) {}

	@Get('plans')
	async findAll(@Query() query: any) {
		return this.plansService.findAll(query);
	}

	@Get('plans/:id')
	async findOne(@Param('id') id: string) {
		return this.plansService.findOne(id);
	}

	@Post('plans')
	async create(@Body() data: any) {
		return this.plansService.create(data);
	}

	@Patch('plans/:id')
	async update(@Param('id') id: string, @Body() data: any) {
		return this.plansService.update(id, data);
	}

	@Delete('plans/:id')
	async remove(@Param('id') id: string) {
		return this.plansService.remove(id);
	}
}
