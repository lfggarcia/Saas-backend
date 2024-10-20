import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { FormFieldValidationsService } from './form-field-validations.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CreateFormFieldValidationDto } from './dto/create-form-field-validation.dto/create-form-field-validation.dto';
import { UpdateFormFieldValidationDto } from './dto/update-form-field-validation.dto/update-form-field-validation.dto';

@Controller('users/apps/:appId/features/:featureId/screens/:screenId/components/:componentId/form-fields/:formFieldId/validations')
@UseGuards(JwtAuthGuard)
export class FormFieldValidationsController {
  constructor(private readonly formFieldValidationsService: FormFieldValidationsService) {}

  @Get()
  getAllFormFieldValidations(@Param('formFieldId') formFieldId: string) {
    return this.formFieldValidationsService.getAllFormFieldValidations(formFieldId);
  }

  @Get(':id')
  getFormFieldValidationById(@Param('id') id: string) {
    return this.formFieldValidationsService.getFormFieldValidationById(id);
  }

  @Post()
  createFormFieldValidation(@Param('formFieldId') formFieldId: string, @Body() createFormFieldValidationDto: CreateFormFieldValidationDto) {
    return this.formFieldValidationsService.createFormFieldValidation(formFieldId, createFormFieldValidationDto);
  }

  @Put(':id')
  updateFormFieldValidation(@Param('id') id: string, @Body() updateFormFieldValidationDto: UpdateFormFieldValidationDto) {
    return this.formFieldValidationsService.updateFormFieldValidation(id, updateFormFieldValidationDto);
  }

  @Delete(':id')
  deleteFormFieldValidation(@Param('id') id: string) {
    return this.formFieldValidationsService.deleteFormFieldValidation(id);
  }
}
