import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/commons/guards/roles.guard';
import { ApplicationsService } from './applications.service';
import { Applications } from 'src/entities';

@Controller('applications')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ApplicationsController {
	constructor(
		private readonly applicationsService: ApplicationsService,
	) {}

	@Get('/')
	async findAll(@Request() req: any, @Query() query: any) {
		const userId = req.user.id;
		return this.applicationsService.findAll(userId, query);
	}

	@Get('/:id')
	async findOne(@Request() req: any, @Param('id') id: string) {
		const userId = req.user.id;
		return this.applicationsService.findOne(id, userId);
	}

	@Post('/')
	async create(@Request() req: any, @Body() data: Applications) {
		const userId = req.user.id;
		return this.applicationsService.create(userId, data);
	}

	@Patch('/:id')
	async update(@Request() req: any, @Param('id') id: string, @Body() data: Partial<Applications>) {
		const userId = req.user.id;
		return this.applicationsService.update(id, userId, data);
	}

	@Delete('/:id')
	async remove(@Request() req: any, @Param('id') id: string) {
		const userId = req.user.id;
		return this.applicationsService.remove(id, userId);
	}
}
