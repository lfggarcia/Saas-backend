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
    const globalComponent = this.globalComponentsRepository.create({
      ...createGlobalComponentDto,
      user: { id: userId },
      componentType: { id: createGlobalComponentDto.component_type_id },
    });

    return this.globalComponentsRepository.save(globalComponent);
  }

  async findAll(userId: string): Promise<GlobalComponent[]> {
    return this.globalComponentsRepository.find({
      where: { user: { id: userId } },
      relations: ['componentType'],
    });
  }

  async findOne(id: string, userId: string): Promise<GlobalComponent> {
    const globalComponent = await this.globalComponentsRepository.findOne({
      where: { id },
      relations: ['componentType', 'user'],
    });

    if (!globalComponent) {
      throw new NotFoundException('Componente global no encontrado');
    }

    if (globalComponent.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a este componente global');
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

    return this.globalComponentsRepository.findOne({where:{id}, relations: ['componentType'] });
  }

  async remove(id: string, userId: string): Promise<void> {
    const globalComponent = await this.findOne(id, userId);

    await this.globalComponentsRepository.delete(id);
  }
}
