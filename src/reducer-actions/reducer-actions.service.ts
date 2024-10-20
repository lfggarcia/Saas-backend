import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReducerAction } from '../entities/reducer-action.entity';
import { Reducer } from '../entities/reducer.entity';
import { CreateReducerActionDto } from './dto/create-reducer-action.dto/create-reducer-action.dto';

@Injectable()
export class ReducerActionsService {
  constructor(
    @InjectRepository(ReducerAction)
    private reducerActionsRepository: Repository<ReducerAction>,

    @InjectRepository(Reducer)
    private reducersRepository: Repository<Reducer>,
  ) {}

  getAllReducerActions(reducerId: string) {
    return this.reducerActionsRepository.find({ where: { reducer: { id: reducerId } } });
  }

  getReducerActionById(id: string) {
    return this.reducerActionsRepository.findOne({ where: { id }, relations: ['reducer'] });
  }

  async createReducerAction(reducerId: string, createReducerActionDto: CreateReducerActionDto, userId: string) {
		const reducer = await this.reducersRepository.findOne({
			where: { id: reducerId },
			relations: ['store', 'store.application', 'store.application.user'],
		});
	
		if (!reducer || reducer.store.application.user.id !== userId) {
			throw new Error('You are not authorized to create an action for this reducer');
		}
	
		const newReducerAction = this.reducerActionsRepository.create({
			...createReducerActionDto,
			reducer,
		});
	
		return this.reducerActionsRepository.save(newReducerAction);
	}
	
	async updateReducerAction(id: string, updateReducerActionDto: CreateReducerActionDto, userId: string) {
		const reducerAction = await this.reducerActionsRepository.findOne({
			where: { id },
			relations: ['reducer', 'reducer.store', 'reducer.store.application', 'reducer.store.application.user'],
		});
	
		if (!reducerAction || reducerAction.reducer.store.application.user.id !== userId) {
			throw new Error('You are not authorized to update this action');
		}
	
		Object.assign(reducerAction, updateReducerActionDto);
		return this.reducerActionsRepository.save(reducerAction);
	}
	
	async deleteReducerAction(id: string, userId: string) {
		const reducerAction = await this.reducerActionsRepository.findOne({
			where: { id },
			relations: ['reducer', 'reducer.store', 'reducer.store.application', 'reducer.store.application.user'],
		});
	
		if (!reducerAction || reducerAction.reducer.store.application.user.id !== userId) {
			throw new Error('You are not authorized to delete this action');
		}
	
		return this.reducerActionsRepository.delete(id);
	}
	
}
