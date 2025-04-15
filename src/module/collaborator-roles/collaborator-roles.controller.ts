import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CollaboratorRolesService } from './collaborator-roles.service';
import { CreateCollaboratorRoleDto } from './dto/create-collaborator-role.dto';
import { UpdateCollaboratorRoleDto } from './dto/update-collaborator-role.dto';

@Controller('collaborator-roles')
export class CollaboratorRolesController {
  constructor(private readonly collaboratorRolesService: CollaboratorRolesService) {}

  @Post()
  create(@Body() createCollaboratorRoleDto: CreateCollaboratorRoleDto) {
    return this.collaboratorRolesService.create(createCollaboratorRoleDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.collaboratorRolesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collaboratorRolesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCollaboratorRoleDto: UpdateCollaboratorRoleDto) {
    return this.collaboratorRolesService.update(id, updateCollaboratorRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collaboratorRolesService.remove(id);
  }
}
