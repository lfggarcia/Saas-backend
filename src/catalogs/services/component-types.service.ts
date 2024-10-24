import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ComponentType } from '../entities/component-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ComponentTypesService {
  constructor(
    @InjectRepository(ComponentType)
    private componentTypesRepository: Repository<ComponentType>,
  ) {}

  findAll(): Promise<ComponentType[]> {
    return this.componentTypesRepository.find();
  }

  findOne(id: string): Promise<ComponentType> {
    return this.componentTypesRepository.findOne({ where: { id } });
  }

  create(componentType: Partial<ComponentType>): Promise<ComponentType> {
    const newComponentType = this.componentTypesRepository.create(componentType);
    return this.componentTypesRepository.save(newComponentType);
  }

  async update(id: string, componentType: Partial<ComponentType>): Promise<ComponentType> {
    await this.componentTypesRepository.update(id, componentType);
    return this.componentTypesRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.componentTypesRepository.delete(id);
  }
}
