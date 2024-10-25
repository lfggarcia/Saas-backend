import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Feature } from './entities/feature.entity';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';

@Injectable()
export class FeaturesService {
  constructor(
    @InjectRepository(Feature)
    private featuresRepository: Repository<Feature>,
  ) {}

  async create(createFeatureDto: CreateFeatureDto, userId: string): Promise<Feature> {
    const app = await this.featuresRepository.manager.findOne('App', createFeatureDto.app_id, {
      relations: ['user'],
    });

    if (!app) {
      throw new NotFoundException('Aplicación no encontrada');
    }

    if (app.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para agregar características a esta aplicación');
    }

    const feature = this.featuresRepository.create({
      ...createFeatureDto,
      app: { id: createFeatureDto.app_id },
    });

    return this.featuresRepository.save(feature);
  }

  async findAll(userId: string): Promise<Feature[]> {
    return this.featuresRepository.find({
      where: { app: { user: { id: userId } } },
      relations: ['app'],
    });
  }

  async findOne(id: string, userId: string): Promise<Feature> {
    const feature = await this.featuresRepository.findOne({
      where: { id },
      relations: ['app', 'app.user'],
    });

    if (!feature) {
      throw new NotFoundException('Característica no encontrada');
    }

    if (feature.app.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a esta característica');
    }

    return feature;
  }

  async update(id: string, updateFeatureDto: UpdateFeatureDto, userId: string): Promise<Feature> {
    const feature = await this.findOne(id, userId);

    await this.featuresRepository.update(id, updateFeatureDto);

    return this.featuresRepository.findOne(id);
  }

  async remove(id: string, userId: string): Promise<void> {
    const feature = await this.findOne(id, userId);

    await this.featuresRepository.delete(id);
  }
}
