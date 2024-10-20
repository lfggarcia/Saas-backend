import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reducer } from '../entities/reducer.entity';
import { Store } from '../entities/store.entity';
import { CreateReducerDto } from './dto/create-reducer.dto/create-reducer.dto';

@Injectable()
export class ReducersService {
  constructor(
    @InjectRepository(Reducer)
    private reducersRepository: Repository<Reducer>,

    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
  ) {}

  getAllReducers(storeId: string) {
    return this.reducersRepository.find({ where: { store: { id: storeId } } });
  }

  getReducerById(id: string) {
    return this.reducersRepository.findOne({ where: { id }, relations: ['store'] });
  }

  async createReducer(storeId: string, createReducerDto: CreateReducerDto, userId: string) {
		const store = await this.storesRepository.findOne({
			where: { id: storeId },
			relations: ['application', 'application.user'],
		});
	
		if (!store || store.application.user.id !== userId) {
			throw new Error('You are not authorized to create a reducer for this store');
		}
	
		const newReducer = this.reducersRepository.create({
			...createReducerDto,
			store,
		});
	
		return this.reducersRepository.save(newReducer);
	}
	
	async updateReducer(id: string, updateReducerDto: CreateReducerDto, userId: string) {
		const reducer = await this.reducersRepository.findOne({
			where: { id },
			relations: ['store', 'store.application', 'store.application.user'],
		});
	
		if (!reducer || reducer.store.application.user.id !== userId) {
			throw new Error('You are not authorized to update this reducer');
		}
	
		Object.assign(reducer, updateReducerDto);
		return this.reducersRepository.save(reducer);
	}
	
	async deleteReducer(id: string, userId: string) {
		const reducer = await this.reducersRepository.findOne({
			where: { id },
			relations: ['store', 'store.application', 'store.application.user'],
		});
	
		if (!reducer || reducer.store.application.user.id !== userId) {
			throw new Error('You are not authorized to delete this reducer');
		}
	
		return this.reducersRepository.delete(id);
	}
	
}
