import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { FormFieldsService } from './form-fields.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('users/apps/:appId/features/:featureId/screens/:screenId/components/:componentId/form-fields')
@UseGuards(JwtAuthGuard)  // Protegemos todas las rutas con autenticación JWT
export class FormFieldsController {
  constructor(private readonly formFieldsService: FormFieldsService) {}

  // Obtener todos los campos de un componente de pantalla (acceso para todos los usuarios autenticados)
  @Get()
  getAllFormFields(@Param('componentId') componentId: string) {
    return this.formFieldsService.getAllFormFields(componentId);
  }

  // Obtener un campo específico (acceso para todos los usuarios autenticados)
  @Get(':id')
  getFormFieldById(@Param('id') id: string) {
    return this.formFieldsService.getFormFieldById(id);
  }

  // Crear un nuevo campo de formulario para un componente de pantalla (solo super admin o el dueño de la aplicación)
  @Post()
  createFormField(@Param('componentId') componentId: string, @Body() createFormFieldDto: any) {
    return this.formFieldsService.createFormField(componentId, createFormFieldDto);
  }

  // Actualizar un campo existente (solo super admin o el dueño de la aplicación)
  @Put(':id')
  updateFormField(@Param('id') id: string, @Body() updateFormFieldDto: any) {
    return this.formFieldsService.updateFormField(id, updateFormFieldDto);
  }

  // Eliminar un campo existente (solo super admin o el dueño de la aplicación)
  @Delete(':id')
  deleteFormField(@Param('id') id: string) {
    return this.formFieldsService.deleteFormField(id);
  }
}
