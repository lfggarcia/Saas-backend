import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { FormFieldsService } from './form-fields.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CreateFormFieldDto } from './dto/create-form-field.dto/create-form-field.dto';
import { UpdateFormFieldDto } from './dto/update-form-field.dto/update-form-field.dto';

@Controller('users/apps/:appId/features/:featureId/screens/:screenId/components/:componentId/form-fields')
@UseGuards(JwtAuthGuard)
export class FormFieldsController {
  constructor(private readonly formFieldsService: FormFieldsService) {}

  @Get()
  getAllFormFields(@Param('componentId') componentId: string) {
    return this.formFieldsService.getAllFormFields(componentId);
  }

  @Get(':id')
  getFormFieldById(@Param('id') id: string) {
    return this.formFieldsService.getFormFieldById(id);
  }

  @Post()
  createFormField(@Param('componentId') componentId: string, @Body() createFormFieldDto: CreateFormFieldDto) {
    return this.formFieldsService.createFormField(componentId, createFormFieldDto);
  }

  @Put(':id')
  updateFormField(@Param('id') id: string, @Body() updateFormFieldDto: UpdateFormFieldDto) {
    return this.formFieldsService.updateFormField(id, updateFormFieldDto);
  }

  @Delete(':id')
  deleteFormField(@Param('id') id: string) {
    return this.formFieldsService.deleteFormField(id);
  }
}
