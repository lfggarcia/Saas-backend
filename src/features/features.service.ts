import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feature } from '../entities/feature.entity';
import { Application } from '../entities/application.entity';

@Injectable()
export class FeaturesService {
  constructor(
    @InjectRepository(Feature)
    private featuresRepository: Repository<Feature>,
    
    @InjectRepository(Application)
    private appsRepository: Repository<Application>,
  ) {}

  // Obtener todas las features de una aplicación
  getAllFeatures(appId: string) {
    return this.featuresRepository.find({ where: { application: { id: appId } } });
  }

  // Obtener una feature específica
  getFeatureById(id: string) {
    return this.featuresRepository.findOne({ where: { id }, relations: ['application'] });
  }

  // Crear una nueva feature
	async createFeature(appId: string, createFeatureDto: any, userId: string) {
		const app = await this.appsRepository.findOne({ where: { id: appId }, relations: ['user'] });
	
		if (!app) {
			throw new Error('Application not found');
		}
	
		if (app.user.id !== userId) {
			throw new Error('You are not authorized to modify this application');
		}
	
		const newFeature = this.featuresRepository.create({
			...createFeatureDto,
			application: app,
		});
		return this.featuresRepository.save(newFeature);
	}
	

  // Actualizar una feature existente
  async updateFeature(id: string, updateFeatureDto: any,appId: string, userId: string) {
    const feature = await this.featuresRepository.findOne({ where: { id }, relations: ['application'] });
		const app = await this.appsRepository.findOne({ where: { id: appId }, relations: ['user'] });

		if (!app) {
			throw new Error('Application not found');
		}

		if (app.user.id !== userId) {
			throw new Error('You are not authorized to modify this application');
		}

    if (!feature) {
      throw new Error('Feature not found');
    }
    Object.assign(feature, updateFeatureDto);
    return this.featuresRepository.save(feature);
  }

  // Eliminar una feature
  async deleteFeature(id: string, appId: string, userId: string) {
		const feature = await this.featuresRepository.findOne({ where: { id }, relations: ['application'] });
		const app = await this.appsRepository.findOne({ where: { id: appId }, relations: ['user'] });

		if (!app) {
			throw new Error('Application not found');
		}

		if (!feature) {
			throw new Error('Feature not found');
		}

		if (feature.application.id !== app.id) {
			throw new Error('Feature does not belong to the application');
		}

		if (app.user.id !== userId) {
			throw new Error('You are not authorized to modify this application');
		}
    return this.featuresRepository.delete(id);
  }
}
