import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../entities/store.entity';
import { Application } from '../entities/application.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,

    @InjectRepository(Application)
    private applicationsRepository: Repository<Application>,
  ) {}

  // Obtener la store de una aplicación
  getStoreByAppId(appId: string) {
    return this.storesRepository.findOne({ where: { application: { id: appId } }, relations: ['application'] });
  }

  // Crear una nueva store para una aplicación
  async createStore(appId: string, createStoreDto: any) {
    const application = await this.applicationsRepository.findOne({ where: { id: appId } });

    if (!application) {
      throw new Error('Application not found');
    }

    const newStore = this.storesRepository.create({
      ...createStoreDto,
      application,
    });

    return this.storesRepository.save(newStore);
  }

  // Actualizar una store existente
  async updateStore(id: string, updateStoreDto: any) {
    const store = await this.storesRepository.findOne({ where: { id } });
    if (!store) {
      throw new Error('Store not found');
    }
    Object.assign(store, updateStoreDto);  // Actualizamos los campos
    return this.storesRepository.save(store);
  }

  // Eliminar una store
  deleteStore(id: string) {
    return this.storesRepository.delete(id);
  }
}
