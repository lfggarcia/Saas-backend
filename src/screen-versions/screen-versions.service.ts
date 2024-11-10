import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ScreenVersion } from './entities/screen-version.entity';
import { CreateScreenVersionDto } from './dto/create-screen-version.dto';
import { UpdateScreenVersionDto } from './dto/update-screen-version.dto';

@Injectable()
export class ScreenVersionsService {
  constructor(
    @InjectRepository(ScreenVersion)
    private screenVersionsRepository: Repository<ScreenVersion>,
  ) {}

  async create(createScreenVersionDto: CreateScreenVersionDto, userId: string): Promise<ScreenVersion> {
    // Verificar si el usuario es propietario de la pantalla
    const {screen} = await this.screenVersionsRepository.findOne({
			where: {
				screen: {
					id: createScreenVersionDto.screen_id,
				}
			},
			relations: [
				'screen',,
				'screen.featureVersion',
				'screen.featureVersion.feature',
				'screen.featureVersion.feature.app',
				'screen.featureVersion.feature.app.user'
			],
		})

    if (!screen) {
      throw new NotFoundException('Pantalla no encontrada');
    }

    if (screen.featureVersion.feature.app.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para crear versiones en esta pantalla');
    }

    const screenVersion = this.screenVersionsRepository.create({
      ...createScreenVersionDto,
      screen: { id: createScreenVersionDto.screen_id },
    });

    return this.screenVersionsRepository.save(screenVersion);
  }

  async findAllByScreen(screenId: string, userId: string): Promise<ScreenVersion[]> {
    // Verificar si el usuario es propietario de la pantalla
    const {screen} = await this.screenVersionsRepository.findOne({
			where: {
				screen: {
					id: screenId,
				}
			},
			relations: [
				'screen',,
				'screen.featureVersion',
				'screen.featureVersion.feature',
				'screen.featureVersion.feature.app',
				'screen.featureVersion.feature.app.user'
			],
		})

    if (!screen) {
      throw new NotFoundException('Pantalla no encontrada');
    }

    if (screen.featureVersion.feature.app.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a las versiones de esta pantalla');
    }

    return this.screenVersionsRepository.find({
      where: { screen: { id: screenId } },
    });
  }

  async findOne(id: string, userId: string): Promise<ScreenVersion> {
    const screenVersion = await this.screenVersionsRepository.findOne({
      where: { id },
      relations: [
				'screen',
				'screen.featureVersion',
				'screen.featureVersion.feature',
				'screen.featureVersion.feature.app',
				'screen.featureVersion.feature.app.user'
			],
    });

    if (!screenVersion) {
      throw new NotFoundException('Versión de pantalla no encontrada');
    }

    if (screenVersion.screen.featureVersion.feature.app.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a esta versión');
    }

    return screenVersion;
  }

  async update(id: string, updateScreenVersionDto: UpdateScreenVersionDto, userId: string): Promise<ScreenVersion> {
    const screenVersion = await this.findOne(id, userId);

    await this.screenVersionsRepository.update(id, updateScreenVersionDto);

    return this.screenVersionsRepository.findOne({
			where: { id },
		});
  }

  async remove(id: string, userId: string): Promise<void> {
    const screenVersion = await this.findOne(id, userId);

    await this.screenVersionsRepository.delete(id);
  }
}
