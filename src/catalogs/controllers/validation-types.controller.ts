import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ValidationTypesService } from '../services/validation-types.service';
import { ValidationType } from '../entities/validation-type.entity';
import { CreateValidationTypeDto } from '../dto/create-validation-type.dto';
import { UpdateValidationTypeDto } from '../dto/update-validation-type.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';

@Controller('catalogs/validation-types')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
export class ValidationTypesController {
  constructor(private readonly validationTypesService: ValidationTypesService) {}

  @Get()
  findAll(): Promise<ValidationType[]> {
    return this.validationTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ValidationType> {
    return this.validationTypesService.findOne(id);
  }

  @Post()
  create(@Body() createValidationTypeDto: CreateValidationTypeDto): Promise<ValidationType> {
    return this.validationTypesService.create(createValidationTypeDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateValidationTypeDto: UpdateValidationTypeDto,
  ): Promise<ValidationType> {
    return this.validationTypesService.update(id, updateValidationTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.validationTypesService.remove(id);
  }
}
