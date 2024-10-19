import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Screen } from '../entities/screen.entity';
import { FeatureVersion } from '../entities/feature-version.entity';

@Injectable()
export class ScreensService {
  constructor(
    @InjectRepository(Screen)
    private screensRepository: Repository<Screen>,
    
    @InjectRepository(FeatureVersion)
    private featureVersionRepository: Repository<FeatureVersion>,
  ) {}

  // Obtener todas las pantallas de una feature
  getAllScreens(featureId: string) {
    return this.screensRepository.find({ where: { feature_version: { id: featureId } } });
  }

  // Obtener una pantalla específica
  getScreenById(id: string) {
    return this.screensRepository.findOne({ where: { id }, relations: ['feature_version'] });
  }

  // Crear una nueva pantalla
  async createScreen(featureId: string, createScreenDto: any) {
    const featureVersion = await this.featureVersionRepository.findOne({ where: { id: featureId } });
    if (!featureVersion) {
      throw new Error('Feature version not found');
    }
    const newScreen = this.screensRepository.create({ ...createScreenDto, feature_version: featureVersion });
    return this.screensRepository.save(newScreen);
  }

  // Actualizar una pantalla existente
  async updateScreen(id: string, updateScreenDto: any) {
    const screen = await this.screensRepository.findOne({ where: { id } });
    if (!screen) {
      throw new Error('Screen not found');
    }
    Object.assign(screen, updateScreenDto);  // Actualizamos los campos
    return this.screensRepository.save(screen);
  }

  // Eliminar una pantalla
  deleteScreen(id: string) {
    return this.screensRepository.delete(id);
  }
}
