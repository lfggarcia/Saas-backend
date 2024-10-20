import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Screen } from '../entities/screen.entity';
import { FeatureVersion } from '../entities/feature-version.entity';
import { CreateScreenDto } from './dto/create-screen.dto/create-screen.dto';

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
  async createScreen(featureId: string, createScreenDto: CreateScreenDto, userId: string) {
		const featureVersion = await this.featureVersionRepository.findOne({ where: { id: featureId }, relations: ['feature', 'feature.application'] });
	
		if (!featureVersion || featureVersion.feature.application.user.id !== userId) {
			throw new Error('You are not authorized to modify this feature version');
		}
	
		const newScreen = this.screensRepository.create({
			...createScreenDto,
			feature_version: featureVersion,
		});
	
		return this.screensRepository.save(newScreen);
	}

  // Actualizar una pantalla existente
	async updateScreen(id: string, updateScreenDto: any, userId: string) {
		const screen = await this.screensRepository.findOne({ where: { id }, relations: ['feature_version', 'feature_version.feature', 'feature_version.feature.application'] });
	
		if (!screen || screen.feature_version.feature.application.user.id !== userId) {
			throw new Error('You are not authorized to modify this screen');
		}
	
		Object.assign(screen, updateScreenDto);
		return this.screensRepository.save(screen);
	}

  // Eliminar una pantalla
	async deleteScreen(id: string, userId: string) {
		const screen = await this.screensRepository.findOne({ where: { id }, relations: ['feature_version', 'feature_version.feature', 'feature_version.feature.application'] });
	
		if (!screen || screen.feature_version.feature.application.user.id !== userId) {
			throw new Error('You are not authorized to delete this screen');
		}
	
		return this.screensRepository.delete(id);
	}
}
