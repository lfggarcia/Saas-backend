import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeatureVersion } from '../entities/feature-version.entity';
import { Feature } from '../entities/feature.entity';
import { CreateFeatureVersionDto } from './dto/create-feature-version.dto/create-feature-version.dto';

@Injectable()
export class FeatureVersionsService {
  constructor(
    @InjectRepository(FeatureVersion)
    private featureVersionsRepository: Repository<FeatureVersion>,

    @InjectRepository(Feature)
    private featuresRepository: Repository<Feature>,
  ) {}

  // Obtener todas las versiones de una feature
  getAllFeatureVersions(featureId: string) {
    return this.featureVersionsRepository.find({ where: { feature: { id: featureId } } });
  }

  // Obtener una versión específica de una feature
  getFeatureVersionById(id: string) {
    return this.featureVersionsRepository.findOne({ where: { id }, relations: ['feature'] });
  }

  // Crear una nueva versión de una feature
  async createFeatureVersion(featureId: string, createFeatureVersionDto: CreateFeatureVersionDto, userId: string) {
    const feature = await this.featuresRepository.findOne({ where: { id: featureId }, relations: ['application'] });

    if (!feature || feature.application.user.id !== userId) {
      throw new Error('You are not authorized to modify this feature');
    }

    const newFeatureVersion = this.featureVersionsRepository.create({
      ...createFeatureVersionDto,
      feature,
    });

    return this.featureVersionsRepository.save(newFeatureVersion);
  }

  // Actualizar una versión de una feature
  async updateFeatureVersion(id: string, updateFeatureVersionDto: any, userId: string) {
    const featureVersion = await this.featureVersionsRepository.findOne({ where: { id }, relations: ['feature', 'feature.application'] });

    if (!featureVersion || featureVersion.feature.application.user.id !== userId) {
      throw new Error('You are not authorized to modify this version');
    }

    Object.assign(featureVersion, updateFeatureVersionDto);
    return this.featureVersionsRepository.save(featureVersion);
  }

  // Eliminar una versión de una feature
  async deleteFeatureVersion(id: string, userId: string) {
    const featureVersion = await this.featureVersionsRepository.findOne({ where: { id }, relations: ['feature', 'feature.application'] });

    if (!featureVersion || featureVersion.feature.application.user.id !== userId) {
      throw new Error('You are not authorized to delete this version');
    }

    return this.featureVersionsRepository.delete(id);
  }
}
