import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { FieldTypesService } from '../services/field-types.service';
import { FieldType } from '../entities/field-type.entity';
import { CreateFieldTypeDto } from '../dto/create-field-type.dto';
import { UpdateFieldTypeDto } from '../dto/update-field-type.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@Controller('catalogs/field-types')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('superadmin')
export class FieldTypesController {
  constructor(private readonly fieldTypesService: FieldTypesService) {}

  @Get()
  findAll(): Promise<FieldType[]> {
    return this.fieldTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<FieldType> {
    return this.fieldTypesService.findOne(id);
  }

  @Post()
  create(@Body() createFieldTypeDto: CreateFieldTypeDto): Promise<FieldType> {
    return this.fieldTypesService.create(createFieldTypeDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFieldTypeDto: UpdateFieldTypeDto,
  ): Promise<FieldType> {
    return this.fieldTypesService.update(id, updateFieldTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.fieldTypesService.remove(id);
  }
}
