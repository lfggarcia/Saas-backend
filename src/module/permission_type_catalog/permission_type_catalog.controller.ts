import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PermissionTypeCatalogService } from './permission_type_catalog.service';
import { CreatePermissionTypeCatalogDto } from './dto/create-permission_type_catalog.dto';
import { UpdatePermissionTypeCatalogDto } from './dto/update-permission_type_catalog.dto';

@Controller('permission-type-catalog')
export class PermissionTypeCatalogController {
  constructor(private readonly permissionTypeCatalogService: PermissionTypeCatalogService) {}

  @Post()
  create(@Body() createPermissionTypeCatalogDto: CreatePermissionTypeCatalogDto) {
    return this.permissionTypeCatalogService.create(createPermissionTypeCatalogDto);
  }

  @Get()
  findAll(@Query() query: Partial<CreatePermissionTypeCatalogDto>) {
    return this.permissionTypeCatalogService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionTypeCatalogService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermissionTypeCatalogDto: UpdatePermissionTypeCatalogDto) {
    return this.permissionTypeCatalogService.update(id, updatePermissionTypeCatalogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionTypeCatalogService.remove(id);
  }
}
