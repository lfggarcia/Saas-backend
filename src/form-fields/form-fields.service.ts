import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormField } from '../entities/form-field.entity';
import { ScreenComponent } from '../entities/screen-component.entity';

@Injectable()
export class FormFieldsService {
  constructor(
    @InjectRepository(FormField)
    private formFieldsRepository: Repository<FormField>,

    @InjectRepository(ScreenComponent)
    private screenComponentsRepository: Repository<ScreenComponent>,
  ) {}

  // Obtener todos los campos de un componente de pantalla
  getAllFormFields(screenComponentId: string) {
    return this.formFieldsRepository.find({ where: { screen_component: { id: screenComponentId } } });
  }

  // Obtener un campo específico
  getFormFieldById(id: string) {
    return this.formFieldsRepository.findOne({ where: { id }, relations: ['screen_component'] });
  }

  // Crear un nuevo campo de formulario para un componente de pantalla
  async createFormField(screenComponentId: string, createFormFieldDto: any) {
    const screenComponent = await this.screenComponentsRepository.findOne({ where: { id: screenComponentId } });

    if (!screenComponent) {
      throw new Error('Screen component not found');
    }

    const newFormField = this.formFieldsRepository.create({
      ...createFormFieldDto,
      screen_component: screenComponent,
    });

    return this.formFieldsRepository.save(newFormField);
  }

  // Actualizar un campo existente
  async updateFormField(id: string, updateFormFieldDto: any) {
    const formField = await this.formFieldsRepository.findOne({ where: { id } });
    if (!formField) {
      throw new Error('Form field not found');
    }
    Object.assign(formField, updateFormFieldDto);  // Actualizamos los campos
    return this.formFieldsRepository.save(formField);
  }

  // Eliminar un campo de formulario
  deleteFormField(id: string) {
    return this.formFieldsRepository.delete(id);
  }
}
