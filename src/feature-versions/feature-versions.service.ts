import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FeatureVersion } from './entities/feature-version.entity';
import { CreateFeatureVersionDto } from './dto/create-feature-version.dto';
import { UpdateFeatureVersionDto } from './dto/update-feature-version.dto';

@Injectable()
export class FeatureVersionsService {
  constructor(
    @InjectRepository(FeatureVersion)
    private featureVersionsRepository: Repository<FeatureVersion>,
  ) {}

  async create(createFeatureVersionDto: CreateFeatureVersionDto, userId: string): Promise<FeatureVersion> {
    // Verificar si el usuario es propietario de la característica
    const feature = await this.featureVersionsRepository.manager.findOne('Feature', createFeatureVersionDto.feature_id, {
      relations: ['application', 'application.user'],
    });

    if (!feature) {
      throw new NotFoundException('Característica no encontrada');
    }

    if (feature.application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para crear versiones en esta característica');
    }

    const featureVersion = this.featureVersionsRepository.create({
      ...createFeatureVersionDto,
      feature: { id: createFeatureVersionDto.feature_id },
      replacesFeatureVersion: createFeatureVersionDto.replaces_feature_version_id
        ? { id: createFeatureVersionDto.replaces_feature_version_id }
        : null,
    });

    return this.featureVersionsRepository.save(featureVersion);
  }

  async findAllByFeature(featureId: string, userId: string): Promise<FeatureVersion[]> {
    // Verificar si el usuario es propietario de la característica
    const feature = await this.featureVersionsRepository.manager.findOne('Feature', featureId, {
      relations: ['application', 'application.user'],
    });

    if (!feature) {
      throw new NotFoundException('Característica no encontrada');
    }

    if (feature.application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a las versiones de esta característica');
    }

    return this.featureVersionsRepository.find({
      where: { feature: { id: featureId } },
      relations: ['replacesFeatureVersion'],
    });
  }

  async findOne(id: string, userId: string): Promise<FeatureVersion> {
    const featureVersion = await this.featureVersionsRepository.findOne({
      where: { id },
      relations: ['feature', 'feature.application', 'feature.application.user', 'replacesFeatureVersion'],
    });

    if (!featureVersion) {
      throw new NotFoundException('Versión de característica no encontrada');
    }

    if (featureVersion.feature.application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a esta versión');
    }

    return featureVersion;
  }

  async update(id: string, updateFeatureVersionDto: UpdateFeatureVersionDto, userId: string): Promise<FeatureVersion> {
    const featureVersion = await this.findOne(id, userId);

    if (updateFeatureVersionDto.replaces_feature_version_id !== undefined) {
      updateFeatureVersionDto.replacesFeatureVersion = updateFeatureVersionDto.replaces_feature_version_id
        ? { id: updateFeatureVersionDto.replaces_feature_version_id }
        : null;
    }

    await this.featureVersionsRepository.update(id, {
      ...updateFeatureVersionDto,
      replacesFeatureVersion: updateFeatureVersionDto.replacesFeatureVersion,
    });

    return this.featureVersionsRepository.findOne(id, { relations: ['replacesFeatureVersion'] });
  }

  async remove(id: string, userId: string): Promise<void> {
    const featureVersion = await this.findOne(id, userId);

    await this.featureVersionsRepository.delete(id);
  }
}
