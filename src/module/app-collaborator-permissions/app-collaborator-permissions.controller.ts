import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AppCollaboratorPermissionsService } from './app-collaborator-permissions.service';
import { CreateAppCollaboratorPermissionDto } from './dto/create-app-collaborator-permission.dto';
import { UpdateAppCollaboratorPermissionDto } from './dto/update-app-collaborator-permission.dto';

@Controller('app-collaborator-permissions')
export class AppCollaboratorPermissionsController {
  constructor(private readonly appCollaboratorPermissionsService: AppCollaboratorPermissionsService) {}

  @Post()
  create(@Body() createAppCollaboratorPermissionDto: CreateAppCollaboratorPermissionDto) {
    return this.appCollaboratorPermissionsService.create(createAppCollaboratorPermissionDto);
  }

  @Get()
  findAll(@Query() query: Partial<CreateAppCollaboratorPermissionDto>) {
    return this.appCollaboratorPermissionsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appCollaboratorPermissionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppCollaboratorPermissionDto: UpdateAppCollaboratorPermissionDto) {
    return this.appCollaboratorPermissionsService.update(id, updateAppCollaboratorPermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appCollaboratorPermissionsService.remove(id);
  }
}
