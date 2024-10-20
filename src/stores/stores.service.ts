import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../entities/store.entity';
import { Application } from '../entities/application.entity';
import { CreateStoreDto } from './dto/create-store.dto/create-store.dto';

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

	async createStore(appId: string, createStoreDto: CreateStoreDto, userId: string) {
		const application = await this.applicationsRepository.findOne({
			where: { id: appId },
			relations: ['user'],
		});
	
		if (!application || application.user.id !== userId) {
			throw new Error('You are not authorized to create a store for this application');
		}
	
		const newStore = this.storesRepository.create({
			...createStoreDto,
			application,
		});
	
		return this.storesRepository.save(newStore);
	}
	
	async updateStore(id: string, updateStoreDto: CreateStoreDto, userId: string) {
		const store = await this.storesRepository.findOne({
			where: { id },
			relations: ['application', 'application.user'],
		});
	
		if (!store || store.application.user.id !== userId) {
			throw new Error('You are not authorized to update this store');
		}
	
		Object.assign(store, updateStoreDto);  // Actualizamos los campos
		return this.storesRepository.save(store);
	}
	
	async deleteStore(id: string, userId: string) {
		const store = await this.storesRepository.findOne({
			where: { id },
			relations: ['application', 'application.user'],
		});
	
		if (!store || store.application.user.id !== userId) {
			throw new Error('You are not authorized to delete this store');
		}
	
		return this.storesRepository.delete(id);
	}
	
}
