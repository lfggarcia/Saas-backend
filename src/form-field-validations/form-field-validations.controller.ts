import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { FormFieldValidationsService } from './form-field-validations.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('users/apps/:appId/features/:featureId/screens/:screenId/components/:componentId/form-fields/:formFieldId/validations')
@UseGuards(JwtAuthGuard)  // Protegemos todas las rutas con autenticación JWT
export class FormFieldValidationsController {
  constructor(private readonly formFieldValidationsService: FormFieldValidationsService) {}

  // Obtener todas las validaciones de un campo de formulario (acceso para todos los usuarios autenticados)
  @Get()
  getAllFormFieldValidations(@Param('formFieldId') formFieldId: string) {
    return this.formFieldValidationsService.getAllFormFieldValidations(formFieldId);
  }

  // Obtener una validación específica (acceso para todos los usuarios autenticados)
  @Get(':id')
  getFormFieldValidationById(@Param('id') id: string) {
    return this.formFieldValidationsService.getFormFieldValidationById(id);
  }

  // Crear una nueva validación para un campo de formulario (solo super admin o el dueño de la aplicación)
  @Post()
  createFormFieldValidation(@Param('formFieldId') formFieldId: string, @Body() createFormFieldValidationDto: any) {
    return this.formFieldValidationsService.createFormFieldValidation(formFieldId, createFormFieldValidationDto);
  }

  // Actualizar una validación existente (solo super admin o el dueño de la aplicación)
  @Put(':id')
  updateFormFieldValidation(@Param('id') id: string, @Body() updateFormFieldValidationDto: any) {
    return this.formFieldValidationsService.updateFormFieldValidation(id, updateFormFieldValidationDto);
  }

  // Eliminar una validación existente (solo super admin o el dueño de la aplicación)
  @Delete(':id')
  deleteFormFieldValidation(@Param('id') id: string) {
    return this.formFieldValidationsService.deleteFormFieldValidation(id);
  }
}
