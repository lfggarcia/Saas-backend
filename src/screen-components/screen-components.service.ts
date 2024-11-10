import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ScreenComponent } from './entities/screen-component.entity';
import { CreateScreenComponentDto } from './dto/create-screen-component.dto';
import { UpdateScreenComponentDto } from './dto/update-screen-component.dto';

@Injectable()
export class ScreenComponentsService {
  constructor(
    @InjectRepository(ScreenComponent)
    private screenComponentsRepository: Repository<ScreenComponent>,
  ) {}

  async create(createScreenComponentDto: CreateScreenComponentDto, userId: string): Promise<ScreenComponent> {
    // Verificar si el usuario es propietario de la pantalla
    const {screenVersion} = await this.screenComponentsRepository.findOne({
			where: {
				screenVersion: { id: createScreenComponentDto.screen_version_id }
			},
			relations: [
				'screenVersion',
				'screenVersion.screen',
				'screenVersion.screen.featureVersion',
				'screenVersion.screen.featureVersion.feature',
				'screenVersion.screen.featureVersion.feature.app',
				'screenVersion.screen.featureVersion.feature.app.user'
			],
		})

    if (!screenVersion) {
      throw new NotFoundException('Versión de pantalla no encontrada');
    }

    const applicationUserId = screenVersion.screen.featureVersion.feature.app.user.id;

    if (applicationUserId !== userId) {
      throw new ForbiddenException('No tienes permiso para modificar componentes en esta pantalla');
    }

    const screenComponent = this.screenComponentsRepository.create({
      ...createScreenComponentDto,
      screenVersion: { id: createScreenComponentDto.screen_version_id },
      globalComponent: { id: createScreenComponentDto.global_component_id },
      translationKey: createScreenComponentDto.translation_key_id ? { id: createScreenComponentDto.translation_key_id } : null,
    });

    return this.screenComponentsRepository.save(screenComponent);
  }

  async findAllByScreenVersion(screenVersionId: string, userId: string): Promise<ScreenComponent[]> {
    const {screenVersion} = await this.screenComponentsRepository.findOne({
			where: {
				screenVersion: { id: screenVersionId }
			},
			relations: [
				'screenVersion',
				'screenVersion.screen',
				'screenVersion.screen.featureVersion',
				'screenVersion.screen.featureVersion.feature',
				'screenVersion.screen.featureVersion.feature.app',
				'screenVersion.screen.featureVersion.feature.app.user'
			],
		})
		// .manager.findOne('ScreenVersion', {
    //   where: { id: screenVersionId },
    //   relations: ['screen', 'screen.featureVersion', 'screen.featureVersion.feature', 'screen.featureVersion.feature.application', 'screen.featureVersion.feature.application.user'],
    // });

    if (!screenVersion) {
      throw new NotFoundException('Versión de pantalla no encontrada');
    }

    const applicationUserId = screenVersion.screen.featureVersion.feature.app.user.id;

    if (applicationUserId !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a los componentes de esta pantalla');
    }

    return this.screenComponentsRepository.find({
      where: { screenVersion: { id: screenVersionId } },
      relations: ['globalComponent', 'translationKey'],
    });
  }

  async findOne(id: string, userId: string): Promise<ScreenComponent> {
    const screenComponent = await this.screenComponentsRepository.findOne({
      where: { id },
      relations: [
        'screenVersion',
        'screenVersion.screen',
        'screenVersion.screen.featureVersion',
        'screenVersion.screen.featureVersion.feature',
        'screenVersion.screen.featureVersion.feature.app',
        'screenVersion.screen.featureVersion.feature.app.user',
        'globalComponent',
        'translationKey',
      ],
    });

    if (!screenComponent) {
      throw new NotFoundException('Componente de pantalla no encontrado');
    }

    const applicationUserId = screenComponent.screenVersion.screen.featureVersion.feature.app.user.id;

    if (applicationUserId !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a este componente');
    }

    return screenComponent;
  }

  async update(id: string, updateScreenComponentDto: UpdateScreenComponentDto, userId: string): Promise<ScreenComponent> {
    const screenComponent = await this.findOne(id, userId);

    if (updateScreenComponentDto.global_component_id) {
      updateScreenComponentDto.globalComponent = { id: updateScreenComponentDto.global_component_id };
    }

    if (updateScreenComponentDto.translation_key_id !== undefined) {
      updateScreenComponentDto.translationKey = updateScreenComponentDto.translation_key_id
        ? { id: updateScreenComponentDto.translation_key_id }
        : null;
    }

    await this.screenComponentsRepository.update(id, {
      ...updateScreenComponentDto,
      globalComponent: updateScreenComponentDto.globalComponent,
      translationKey: updateScreenComponentDto.translationKey,
    });

    return this.screenComponentsRepository.findOne({
			where: { id },
			relations: ['globalComponent', 'translationKey'],
		})
  }

  async remove(id: string, userId: string): Promise<void> {
    const screenComponent = await this.findOne(id, userId);

    await this.screenComponentsRepository.delete(id);
  }
}
