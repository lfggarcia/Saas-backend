import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ReducerAction } from './entities/reducer-action.entity';
import { CreateReducerActionDto } from './dto/create-reducer-action.dto';
import { UpdateReducerActionDto } from './dto/update-reducer-action.dto';
import { Reducer } from '../reducers/entities/reducer.entity';

@Injectable()
export class ReducerActionsService {
  constructor(
    @InjectRepository(ReducerAction)
    private reducerActionsRepository: Repository<ReducerAction>,
    @InjectRepository(Reducer)
    private reducersRepository: Repository<Reducer>,
  ) {}

  async create(createReducerActionDto: CreateReducerActionDto, userId: string): Promise<ReducerAction> {
    // Verificar si el usuario es propietario del reducer
    const reducer = await this.reducersRepository.findOne(createReducerActionDto.reducer_id, {
      relations: ['store', 'store.application', 'store.application.user'],
    });

    if (!reducer) {
      throw new NotFoundException('Reducer no encontrado');
    }

    if (reducer.store.application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para agregar acciones a este reducer');
    }

    const reducerAction = this.reducerActionsRepository.create({
      ...createReducerActionDto,
      reducer: { id: createReducerActionDto.reducer_id },
    });

    return this.reducerActionsRepository.save(reducerAction);
  }

  async findAllByReducer(reducerId: string, userId: string): Promise<ReducerAction[]> {
    const reducer = await this.reducersRepository.findOne(reducerId, {
      relations: ['store', 'store.application', 'store.application.user'],
    });

    if (!reducer) {
      throw new NotFoundException('Reducer no encontrado');
    }

    if (reducer.store.application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a las acciones de este reducer');
    }

    return this.reducerActionsRepository.find({
      where: { reducer: { id: reducerId } },
    });
  }

  async findOne(id: string, userId: string): Promise<ReducerAction> {
    const reducerAction = await this.reducerActionsRepository.findOne(id, {
      relations: ['reducer', 'reducer.store', 'reducer.store.application', 'reducer.store.application.user'],
    });

    if (!reducerAction) {
      throw new NotFoundException('Acción no encontrada');
    }

    if (reducerAction.reducer.store.application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a esta acción');
    }

    return reducerAction;
  }

  async update(id: string, updateReducerActionDto: UpdateReducerActionDto, userId: string): Promise<ReducerAction> {
    const reducerAction = await this.findOne(id, userId);

    await this.reducerActionsRepository.update(id, updateReducerActionDto);

    return this.reducerActionsRepository.findOne(id);
  }

  async remove(id: string, userId: string): Promise<void> {
    const reducerAction = await this.findOne(id, userId);

    await this.reducerActionsRepository.delete(id);
  }
}
