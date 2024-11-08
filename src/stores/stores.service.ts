import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Store } from './entities/store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { App } from '../apps/entities/app.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
    @InjectRepository(App)
    private appsRepository: Repository<App>,
  ) {}

  async create(createStoreDto: CreateStoreDto, userId: string): Promise<Store> {
    // Verificar si el usuario es propietario de la aplicación
    const application = await this.appsRepository.findOne(createStoreDto.application_id, {
      relations: ['user'],
    });

    if (!application) {
      throw new NotFoundException('Aplicación no encontrada');
    }

    if (application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para agregar stores a esta aplicación');
    }

    const store = this.storesRepository.create({
      ...createStoreDto,
      application: { id: createStoreDto.application_id },
    });

    return this.storesRepository.save(store);
  }

  async findAllByApplication(applicationId: string, userId: string): Promise<Store[]> {
    const application = await this.appsRepository.findOne(applicationId, {
      relations: ['user'],
    });

    if (!application) {
      throw new NotFoundException('Aplicación no encontrada');
    }

    if (application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a los stores de esta aplicación');
    }

    return this.storesRepository.find({
      where: { application: { id: applicationId } },
    });
  }

  async findOne(id: string, userId: string): Promise<Store> {
    const store = await this.storesRepository.findOne(id, {
      relations: ['application', 'application.user'],
    });

    if (!store) {
      throw new NotFoundException('Store no encontrado');
    }

    if (store.application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a este store');
    }

    return store;
  }

  async update(id: string, updateStoreDto: UpdateStoreDto, userId: string): Promise<Store> {
    const store = await this.findOne(id, userId);

    await this.storesRepository.update(id, updateStoreDto);

    return this.storesRepository.findOne(id);
  }

  async remove(id: string, userId: string): Promise<void> {
    const store = await this.findOne(id, userId);

    await this.storesRepository.delete(id);
  }
}
