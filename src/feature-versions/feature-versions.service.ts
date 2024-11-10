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
    const featureVersionObj = await this.featureVersionsRepository.findOne({
			where: { 
				feature: {
					id: createFeatureVersionDto.feature_id
				}
			},
			relations: [
				'feature', 
				'feature.app',
				'feature.app.user'
			]
		})
		const feature = featureVersionObj?.feature

    if (!feature) {
      throw new NotFoundException('Característica no encontrada');
    }

    if (feature.app.user.id !== userId) {
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
    const {feature} = await this.featureVersionsRepository.findOne({
			where: {
				feature: {
					id: featureId
				}
			},
			relations: ['feature.app', 'feature.app.user']
		})

    if (!feature) {
      throw new NotFoundException('Característica no encontrada');
    }

    if (feature.app.user.id !== userId) {
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
      relations: ['feature', 'feature.app', 'feature.app.user', 'replacesFeatureVersion'],
    });

    if (!featureVersion) {
      throw new NotFoundException('Versión de característica no encontrada');
    }

    if (featureVersion.feature.app.user.id !== userId) {
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

    return this.featureVersionsRepository.findOne({
			where: { id },
			relations: ['replacesFeatureVersion']
		});
  }

  async remove(id: string, userId: string): Promise<void> {
    const featureVersion = await this.findOne(id, userId);

    await this.featureVersionsRepository.delete(id);
  }
}
