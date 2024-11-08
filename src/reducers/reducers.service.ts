import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Reducer } from './entities/reducer.entity';
import { CreateReducerDto } from './dto/create-reducer.dto';
import { UpdateReducerDto } from './dto/update-reducer.dto';
import { Store } from '../stores/entities/store.entity';

@Injectable()
export class ReducersService {
  constructor(
    @InjectRepository(Reducer)
    private reducersRepository: Repository<Reducer>,
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
  ) {}

  async create(createReducerDto: CreateReducerDto, userId: string): Promise<Reducer> {
    // Verificar si el usuario es propietario del store
    const store = await this.storesRepository.findOne(createReducerDto.store_id, {
      relations: ['application', 'application.user'],
    });

    if (!store) {
      throw new NotFoundException('Store no encontrado');
    }

    if (store.application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para agregar reducers a este store');
    }

    const reducer = this.reducersRepository.create({
      ...createReducerDto,
      store: { id: createReducerDto.store_id },
    });

    return this.reducersRepository.save(reducer);
  }

  async findAllByStore(storeId: string, userId: string): Promise<Reducer[]> {
    const store = await this.storesRepository.findOne(storeId, {
      relations: ['application', 'application.user'],
    });

    if (!store) {
      throw new NotFoundException('Store no encontrado');
    }

    if (store.application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a los reducers de este store');
    }

    return this.reducersRepository.find({
      where: { store: { id: storeId } },
    });
  }

  async findOne(id: string, userId: string): Promise<Reducer> {
    const reducer = await this.reducersRepository.findOne(id, {
      relations: ['store', 'store.application', 'store.application.user'],
    });

    if (!reducer) {
      throw new NotFoundException('Reducer no encontrado');
    }

    if (reducer.store.application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a este reducer');
    }

    return reducer;
  }

  async update(id: string, updateReducerDto: UpdateReducerDto, userId: string): Promise<Reducer> {
    const reducer = await this.findOne(id, userId);

    await this.reducersRepository.update(id, updateReducerDto);

    return this.reducersRepository.findOne(id);
  }

  async remove(id: string, userId: string): Promise<void> {
    const reducer = await this.findOne(id, userId);

    await this.reducersRepository.delete(id);
  }
}
