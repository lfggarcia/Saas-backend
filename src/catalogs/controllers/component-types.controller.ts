import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ComponentTypesService } from '../services/component-types.service';
import { ComponentType } from '../entities/component-type.entity';
import { CreateComponentTypeDto } from '../dto/create-component-type.dto';
import { UpdateComponentTypeDto } from '../dto/update-component-type.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@Controller('catalogs/component-types')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
export class ComponentTypesController {
  constructor(private readonly componentTypesService: ComponentTypesService) {}

  @Get()
  findAll(): Promise<ComponentType[]> {
    return this.componentTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ComponentType> {
    return this.componentTypesService.findOne(id);
  }

  @Post()
  create(@Body() createComponentTypeDto: CreateComponentTypeDto): Promise<ComponentType> {
    return this.componentTypesService.create(createComponentTypeDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateComponentTypeDto: UpdateComponentTypeDto,
  ): Promise<ComponentType> {
    return this.componentTypesService.update(id, updateComponentTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.componentTypesService.remove(id);
  }
}
