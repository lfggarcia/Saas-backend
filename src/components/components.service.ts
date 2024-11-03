import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Component } from './entities/component.entity';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';

import { Screen } from '../screens/entities/screen.entity'

@Injectable()
export class ComponentsService {
  constructor(
    @InjectRepository(Component)
    private componentsRepository: Repository<Component>,
    @InjectRepository(Screen)
    private screensRepository: Repository<Screen>,
  ) {}

  async create(
    createComponentDto: CreateComponentDto,
    userId: string,
  ): Promise<Component> {
    // Verificar si el usuario es propietario de la pantalla
    const screen = await this.screensRepository.findOne({
      where: { id: createComponentDto.screen_id },
      relations: ['feature', 'feature.app', 'feature.app.user'],
    });

    if (!screen) {
      throw new NotFoundException('Pantalla no encontrada');
    }

    if (screen.feature.app.user.id !== userId) {
      throw new ForbiddenException(
        'No tienes permiso para agregar componentes a esta pantalla',
      );
    }

    const component = this.componentsRepository.create({
      ...createComponentDto,
      screen: { id: createComponentDto.screen_id },
      componentType: { id: createComponentDto.component_type_id },
    });

    return this.componentsRepository.save(component);
  }

  async findAll(userId: string): Promise<Component[]> {
    return this.componentsRepository.find({
      where: { screen: { feature: { app: { user: { id: userId } } } } },
      relations: ['screen', 'componentType', 'properties'],
    });
  }

  async findOne(id: string, userId: string): Promise<Component> {
    const component = await this.componentsRepository.findOne({
      where: { id },
      relations: [
        'screen',
        'screen.feature',
        'screen.feature.app',
        'screen.feature.app.user',
        'componentType',
        'properties',
      ],
    });

    if (!component) {
      throw new NotFoundException('Componente no encontrado');
    }

    if (component.screen.feature.app.user.id !== userId) {
      throw new ForbiddenException(
        'No tienes permiso para acceder a este componente',
      );
    }

    return component;
  }

  async update(
    id: string,
    updateComponentDto: UpdateComponentDto,
    userId: string,
  ): Promise<Component> {
    const component = await this.findOne(id, userId);

    await this.componentsRepository.update(id, {
      ...updateComponentDto,
      componentType: updateComponentDto.component_type_id
        ? { id: updateComponentDto.component_type_id }
        : component.componentType,
    });

    return this.findOne(id, userId);
  }

  async remove(id: string, userId: string): Promise<void> {
    const component = await this.findOne(id, userId);

    await this.componentsRepository.delete(id);
  }
}
