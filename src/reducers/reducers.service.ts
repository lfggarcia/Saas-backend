import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reducer } from '../entities/reducer.entity';
import { Store } from '../entities/store.entity';

@Injectable()
export class ReducersService {
  constructor(
    @InjectRepository(Reducer)
    private reducersRepository: Repository<Reducer>,

    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
  ) {}

  // Obtener todos los reducers de una store
  getAllReducers(storeId: string) {
    return this.reducersRepository.find({ where: { store: { id: storeId } } });
  }

  // Obtener un reducer específico
  getReducerById(id: string) {
    return this.reducersRepository.findOne({ where: { id }, relations: ['store'] });
  }

  // Crear un nuevo reducer para una store
  async createReducer(storeId: string, createReducerDto: any) {
    const store = await this.storesRepository.findOne({ where: { id: storeId } });

    if (!store) {
      throw new Error('Store not found');
    }

    const newReducer = this.reducersRepository.create({
      ...createReducerDto,
      store,
    });

    return this.reducersRepository.save(newReducer);
  }

  // Actualizar un reducer existente
  async updateReducer(id: string, updateReducerDto: any) {
    const reducer = await this.reducersRepository.findOne({ where: { id } });
    if (!reducer) {
      throw new Error('Reducer not found');
    }
    Object.assign(reducer, updateReducerDto);  // Actualizamos los campos
    return this.reducersRepository.save(reducer);
  }

  // Eliminar un reducer
  deleteReducer(id: string) {
    return this.reducersRepository.delete(id);
  }
}
