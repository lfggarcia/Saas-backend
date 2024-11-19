import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

@Controller('themes')
export class ThemesController {
	constructor(
		private readonly themesService: ThemesService
	) {}

	@Get("/")
	async findAll(@Body() body:any, @Query() query:any) {
		return this.themesService.findAll(body.applicationId,query);
	}

	@Get("/:id")
	async findOne(@Body() body:any, @Param('id') id: string) {
		return this.themesService.findOne(body.applicationId, id);
	}

	@Post("/")
	async create(@Body() body: CreateDto) {
		return this.themesService.create(body);
	}

	@Patch("/:id")
	async update(@Body() body:UpdateDto, @Param('id') id: string) {
		return this.themesService.update(body, id);
	}

	@Delete("/:id")
	async remove(@Body() body:any, @Param('id') id: string) {
		return this.themesService.remove(body.applicationId, id);
	}
}
