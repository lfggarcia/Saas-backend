import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScreenVersion } from '../entities/screen-version.entity';
import { Screen } from '../entities/screen.entity';
import { CreateScreenVersionDto } from './dto/create-screen-version.dto/create-screen-version.dto';

@Injectable()
export class ScreenVersionsService {
  constructor(
    @InjectRepository(ScreenVersion)
    private screenVersionsRepository: Repository<ScreenVersion>,

    @InjectRepository(Screen)
    private screensRepository: Repository<Screen>,
  ) {}

  // Obtener todas las versiones de una pantalla
  getAllScreenVersions(screenId: string) {
    return this.screenVersionsRepository.find({ where: { screen: { id: screenId } } });
  }

  // Obtener una versión específica de una pantalla
  getScreenVersionById(id: string) {
    return this.screenVersionsRepository.findOne({ where: { id }, relations: ['screen'] });
  }

  // Crear una nueva versión de una pantalla
  async createScreenVersion(screenId: string, createScreenVersionDto: CreateScreenVersionDto, userId: string) {
    const screen = await this.screensRepository.findOne({ where: { id: screenId }, relations: ['feature_version', 'feature_version.feature', 'feature_version.feature.application'] });

    if (!screen || screen.feature_version.feature.application.user.id !== userId) {
      throw new Error('You are not authorized to modify this screen');
    }

    const newScreenVersion = this.screenVersionsRepository.create({
      ...createScreenVersionDto,
      screen,
    });

    return this.screenVersionsRepository.save(newScreenVersion);
  }

  // Actualizar una versión de una pantalla
  async updateScreenVersion(id: string, updateScreenVersionDto: any, userId: string) {
    const screenVersion = await this.screenVersionsRepository.findOne({ where: { id }, relations: ['screen', 'screen.feature_version', 'screen.feature_version.feature', 'screen.feature_version.feature.application'] });

    if (!screenVersion || screenVersion.screen.feature_version.feature.application.user.id !== userId) {
      throw new Error('You are not authorized to modify this screen version');
    }

    Object.assign(screenVersion, updateScreenVersionDto);
    return this.screenVersionsRepository.save(screenVersion);
  }

  // Eliminar una versión de una pantalla
  async deleteScreenVersion(id: string, userId: string) {
    const screenVersion = await this.screenVersionsRepository.findOne({ where: { id }, relations: ['screen', 'screen.feature_version', 'screen.feature_version.feature', 'screen.feature_version.feature.application'] });

    if (!screenVersion || screenVersion.screen.feature_version.feature.application.user.id !== userId) {
      throw new Error('You are not authorized to delete this screen version');
    }

    return this.screenVersionsRepository.delete(id);
  }
}
