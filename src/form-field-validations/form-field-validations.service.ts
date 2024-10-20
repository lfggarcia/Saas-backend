import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormFieldValidation } from '../entities/form-field-validation.entity';
import { FormField } from '../entities/form-field.entity';

@Injectable()
export class FormFieldValidationsService {
  constructor(
    @InjectRepository(FormFieldValidation)
    private formFieldValidationsRepository: Repository<FormFieldValidation>,

    @InjectRepository(FormField)
    private formFieldsRepository: Repository<FormField>,
  ) {}

  // Obtener todas las validaciones de un campo de formulario
  getAllFormFieldValidations(formFieldId: string) {
    return this.formFieldValidationsRepository.find({ where: { form_field: { id: formFieldId } } });
  }

  // Obtener una validación específica
  getFormFieldValidationById(id: string) {
    return this.formFieldValidationsRepository.findOne({ where: { id }, relations: ['form_field'] });
  }

  // Crear una nueva validación para un campo de formulario
  async createFormFieldValidation(formFieldId: string, createFormFieldValidationDto: any) {
    const formField = await this.formFieldsRepository.findOne({ where: { id: formFieldId } });

    if (!formField) {
      throw new Error('Form field not found');
    }

    const newFormFieldValidation = this.formFieldValidationsRepository.create({
      ...createFormFieldValidationDto,
      form_field: formField,
    });

    return this.formFieldValidationsRepository.save(newFormFieldValidation);
  }

  // Actualizar una validación existente
  async updateFormFieldValidation(id: string, updateFormFieldValidationDto: any) {
    const formFieldValidation = await this.formFieldValidationsRepository.findOne({ where: { id } });
    if (!formFieldValidation) {
      throw new Error('Form field validation not found');
    }
    Object.assign(formFieldValidation, updateFormFieldValidationDto);  // Actualizamos los campos
    return this.formFieldValidationsRepository.save(formFieldValidation);
  }

  // Eliminar una validación
  deleteFormFieldValidation(id: string) {
    return this.formFieldValidationsRepository.delete(id);
  }
}
