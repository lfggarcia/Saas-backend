import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FormFieldValidation } from './entities/form-field-validation.entity';
import { CreateFormFieldValidationDto } from './dto/create-form-field-validation.dto';
import { UpdateFormFieldValidationDto } from './dto/update-form-field-validation.dto';

@Injectable()
export class FormFieldValidationsService {
  constructor(
    @InjectRepository(FormFieldValidation)
    private formFieldValidationsRepository: Repository<FormFieldValidation>,
  ) {}

  async create(createFormFieldValidationDto: CreateFormFieldValidationDto, userId: string): Promise<FormFieldValidation> {
    // Verificar si el usuario es propietario del campo de formulario
    const formField = await this.formFieldValidationsRepository.manager.findOne('FormField', createFormFieldValidationDto.form_field_id, {
      relations: ['screenComponent', 'screenComponent.screenVersion', 'screenComponent.screenVersion.screen', 'screenComponent.screenVersion.screen.featureVersion', 'screenComponent.screenVersion.screen.featureVersion.feature', 'screenComponent.screenVersion.screen.featureVersion.feature.application', 'screenComponent.screenVersion.screen.featureVersion.feature.application.user'],
    });

    if (!formField) {
      throw new NotFoundException('Campo de formulario no encontrado');
    }

    if (formField.screenComponent.screenVersion.screen.featureVersion.feature.application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para agregar validaciones a este campo');
    }

    const formFieldValidation = this.formFieldValidationsRepository.create({
      ...createFormFieldValidationDto,
      formField: { id: createFormFieldValidationDto.form_field_id },
      validationType: { id: createFormFieldValidationDto.validation_type_id },
    });

    return this.formFieldValidationsRepository.save(formFieldValidation);
  }

  async findAllByFormField(formFieldId: string, userId: string): Promise<FormFieldValidation[]> {
    const formField = await this.formFieldValidationsRepository.manager.findOne('FormField', formFieldId, {
      relations: ['screenComponent', 'screenComponent.screenVersion', 'screenComponent.screenVersion.screen', 'screenComponent.screenVersion.screen.featureVersion', 'screenComponent.screenVersion.screen.featureVersion.feature', 'screenComponent.screenVersion.screen.featureVersion.feature.application', 'screenComponent.screenVersion.screen.featureVersion.feature.application.user'],
    });

    if (!formField) {
      throw new NotFoundException('Campo de formulario no encontrado');
    }

    if (formField.screenComponent.screenVersion.screen.featureVersion.feature.application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a las validaciones de este campo');
    }

    return this.formFieldValidationsRepository.find({
      where: { formField: { id: formFieldId } },
      relations: ['validationType'],
    });
  }

  async findOne(id: string, userId: string): Promise<FormFieldValidation> {
    const formFieldValidation = await this.formFieldValidationsRepository.findOne({
      where: { id },
      relations: ['formField', 'formField.screenComponent', 'formField.screenComponent.screenVersion', 'formField.screenComponent.screenVersion.screen', 'formField.screenComponent.screenVersion.screen.featureVersion', 'formField.screenComponent.screenVersion.screen.featureVersion.feature', 'formField.screenComponent.screenVersion.screen.featureVersion.feature.application', 'formField.screenComponent.screenVersion.screen.featureVersion.feature.application.user', 'validationType'],
    });

    if (!formFieldValidation) {
      throw new NotFoundException('Validación no encontrada');
    }

    if (formFieldValidation.formField.screenComponent.screenVersion.screen.featureVersion.feature.application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a esta validación');
    }

    return formFieldValidation;
  }

  async update(id: string, updateFormFieldValidationDto: UpdateFormFieldValidationDto, userId: string): Promise<FormFieldValidation> {
    const formFieldValidation = await this.findOne(id, userId);

    if (updateFormFieldValidationDto.validation_type_id) {
      updateFormFieldValidationDto.validationType = { id: updateFormFieldValidationDto.validation_type_id };
    }

    await this.formFieldValidationsRepository.update(id, {
      ...updateFormFieldValidationDto,
      validationType: updateFormFieldValidationDto.validationType,
    });

    return this.formFieldValidationsRepository.findOne(id, { relations: ['validationType'] });
  }

  async remove(id: string, userId: string): Promise<void> {
    const formFieldValidation = await this.findOne(id, userId);

    await this.formFieldValidationsRepository.delete(id);
  }
}
