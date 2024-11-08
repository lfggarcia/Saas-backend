import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GlobalComponent } from './entities/global-component.entity';
import { CreateGlobalComponentDto } from './dto/create-global-component.dto';
import { UpdateGlobalComponentDto } from './dto/update-global-component.dto';

@Injectable()
export class GlobalComponentsService {
  constructor(
    @InjectRepository(GlobalComponent)
    private globalComponentsRepository: Repository<GlobalComponent>,
  ) {}

  async create(createGlobalComponentDto: CreateGlobalComponentDto, userId: string): Promise<GlobalComponent> {
    // Verificar si el usuario es propietario de la aplicación
    const application = await this.globalComponentsRepository.manager.findOne('App', createGlobalComponentDto.application_id, {
      relations: ['user'],
    });

    if (!application) {
      throw new NotFoundException('Aplicación no encontrada');
    }

    if (application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para agregar componentes a esta aplicación');
    }

    const globalComponent = this.globalComponentsRepository.create({
      ...createGlobalComponentDto,
      application: { id: createGlobalComponentDto.application_id },
      componentType: { id: createGlobalComponentDto.component_type_id },
    });

    return this.globalComponentsRepository.save(globalComponent);
  }

  async findAll(userId: string): Promise<GlobalComponent[]> {
    return this.globalComponentsRepository.find({
      where: { application: { user: { id: userId } } },
      relations: ['application', 'componentType'],
    });
  }

  async findOne(id: string, userId: string): Promise<GlobalComponent> {
    const globalComponent = await this.globalComponentsRepository.findOne({
      where: { id },
      relations: ['application', 'application.user', 'componentType'],
    });

    if (!globalComponent) {
      throw new NotFoundException('Componente global no encontrado');
    }

    if (globalComponent.application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a este componente');
    }

    return globalComponent;
  }

  async update(id: string, updateGlobalComponentDto: UpdateGlobalComponentDto, userId: string): Promise<GlobalComponent> {
    const globalComponent = await this.findOne(id, userId);

    if (updateGlobalComponentDto.component_type_id) {
      updateGlobalComponentDto.componentType = { id: updateGlobalComponentDto.component_type_id };
    }

    await this.globalComponentsRepository.update(id, {
      ...updateGlobalComponentDto,
      componentType: updateGlobalComponentDto.componentType,
    });

    return this.globalComponentsRepository.findOne(id, { relations: ['componentType'] });
  }

  async remove(id: string, userId: string): Promise<void> {
    const globalComponent = await this.findOne(id, userId);

    await this.globalComponentsRepository.delete(id);
  }
}
