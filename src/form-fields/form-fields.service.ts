import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FormField } from './entities/form-field.entity';
import { CreateFormFieldDto } from './dto/create-form-field.dto';
import { UpdateFormFieldDto } from './dto/update-form-field.dto';

@Injectable()
export class FormFieldsService {
  constructor(
    @InjectRepository(FormField)
    private formFieldsRepository: Repository<FormField>,
  ) {}

  async create(createFormFieldDto: CreateFormFieldDto, userId: string): Promise<FormField> {
    const {screenComponent} = await this.formFieldsRepository.findOne({
			where:{
				screenComponent: {
					id: createFormFieldDto.screen_component_id,
				}
			},
			relations: [
				'screenComponent.screenVersion',
				'screenComponent.screenVersion.screen',
				'screenComponent.screenVersion.screen.featureVersion',
				'screenComponent.screenVersion.screen.featureVersion.feature',
				'screenComponent.screenVersion.screen.featureVersion.feature.app',
				'screenComponent.screenVersion.screen.featureVersion.feature.app.user'
			]
		});

    if (!screenComponent) {
      throw new NotFoundException('Componente de pantalla no encontrado');
    }

    if (screenComponent.screenVersion.screen.featureVersion.feature.app.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para agregar campos a este componente');
    }

    const formField = this.formFieldsRepository.create({
      ...createFormFieldDto,
      screenComponent: { id: createFormFieldDto.screen_component_id },
      fieldType: { id: createFormFieldDto.field_type_id },
    });

    return this.formFieldsRepository.save(formField);
  }

  async findAllByScreenComponent(screenComponentId: string, userId: string): Promise<FormField[]> {
    const {screenComponent} = await this.formFieldsRepository.findOne({
			where: {
				screenComponent: {
					id: screenComponentId,
				}
			},
			relations: [
				'screenComponent.screenVersion',
				'screenComponent.screenVersion.screen',
				'screenComponent.screenVersion.screen.featureVersion',
				'screenComponent.screenVersion.screen.featureVersion.feature',
				'screenComponent.screenVersion.screen.featureVersion.feature.app',
				'screenComponent.screenVersion.screen.featureVersion.feature.app.user'
			]
		})

    if (!screenComponent) {
      throw new NotFoundException('Componente de pantalla no encontrado');
    }

    if (screenComponent.screenVersion.screen.featureVersion.feature.app.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a los campos de este componente');
    }

    return this.formFieldsRepository.find({
      where: { screenComponent: { id: screenComponentId } },
      relations: ['fieldType'],
    });
  }

  async findOne(id: string, userId: string): Promise<FormField> {
    const formField = await this.formFieldsRepository.findOne({
      where: { id },
      relations: [
				'screenComponent',
				'screenComponent.screenVersion',
				'screenComponent.screenVersion.screen',
				'screenComponent.screenVersion.screen.featureVersion',
				'screenComponent.screenVersion.screen.featureVersion.feature',
				'screenComponent.screenVersion.screen.featureVersion.feature.app',
				'screenComponent.screenVersion.screen.featureVersion.feature.app.user',
				'fieldType'
			],
    });

    if (!formField) {
      throw new NotFoundException('Campo de formulario no encontrado');
    }

    if (formField.screenComponent.screenVersion.screen.featureVersion.feature.app.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a este campo');
    }

    return formField;
  }

  async update(id: string, updateFormFieldDto: UpdateFormFieldDto, userId: string): Promise<FormField> {
    const formField = await this.findOne(id, userId);

    if (updateFormFieldDto.field_type_id) {
      updateFormFieldDto.fieldType = { id: updateFormFieldDto.field_type_id };
    }

    await this.formFieldsRepository.update(id, {
      ...updateFormFieldDto,
      fieldType: updateFormFieldDto.fieldType,
    });

    return this.formFieldsRepository.findOne({
			where: { id },
			relations: ['fieldType']
		});
  }

  async remove(id: string, userId: string): Promise<void> {
    const formField = await this.findOne(id, userId);

    await this.formFieldsRepository.delete(id);
  }
}
