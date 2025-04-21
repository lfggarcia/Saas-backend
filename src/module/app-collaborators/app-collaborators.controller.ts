import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AppCollaboratorsService } from './app-collaborators.service';
import { CreateAppCollaboratorDto } from './dto/create-app-collaborator.dto';
import { UpdateAppCollaboratorDto } from './dto/update-app-collaborator.dto';

@Controller('app-collaborators')
export class AppCollaboratorsController {
  constructor(private readonly appCollaboratorsService: AppCollaboratorsService) {}

  @Post()
  create(@Body() createAppCollaboratorDto: CreateAppCollaboratorDto) {
    return this.appCollaboratorsService.create(createAppCollaboratorDto);
  }

  @Get()
  findAll(@Query() query: Partial<CreateAppCollaboratorDto>) {
    return this.appCollaboratorsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appCollaboratorsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppCollaboratorDto: UpdateAppCollaboratorDto) {
    return this.appCollaboratorsService.update(id, updateAppCollaboratorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appCollaboratorsService.remove(id);
  }
}
