import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReducerAction } from '../entities/reducer-action.entity';
import { Reducer } from '../entities/reducer.entity';

@Injectable()
export class ReducerActionsService {
  constructor(
    @InjectRepository(ReducerAction)
    private reducerActionsRepository: Repository<ReducerAction>,

    @InjectRepository(Reducer)
    private reducersRepository: Repository<Reducer>,
  ) {}

  // Obtener todas las acciones de un reducer
  getAllReducerActions(reducerId: string) {
    return this.reducerActionsRepository.find({ where: { reducer: { id: reducerId } } });
  }

  // Obtener una acción específica
  getReducerActionById(id: string) {
    return this.reducerActionsRepository.findOne({ where: { id }, relations: ['reducer'] });
  }

  // Crear una nueva acción para un reducer
  async createReducerAction(reducerId: string, createReducerActionDto: any) {
    const reducer = await this.reducersRepository.findOne({ where: { id: reducerId } });

    if (!reducer) {
      throw new Error('Reducer not found');
    }

    const newReducerAction = this.reducerActionsRepository.create({
      ...createReducerActionDto,
      reducer,
    });

    return this.reducerActionsRepository.save(newReducerAction);
  }

  // Actualizar una acción existente
  async updateReducerAction(id: string, updateReducerActionDto: any) {
    const reducerAction = await this.reducerActionsRepository.findOne({ where: { id } });
    if (!reducerAction) {
      throw new Error('Reducer action not found');
    }
    Object.assign(reducerAction, updateReducerActionDto);  // Actualizamos los campos
    return this.reducerActionsRepository.save(reducerAction);
  }

  // Eliminar una acción
  deleteReducerAction(id: string) {
    return this.reducerActionsRepository.delete(id);
  }
}
