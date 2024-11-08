import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createGlobalComponentDto: CreateGlobalComponentDto): Promise<GlobalComponent> {
    const globalComponent = this.globalComponentsRepository.create({
      ...createGlobalComponentDto,
      componentType: { id: createGlobalComponentDto.component_type_id },
    });

    return this.globalComponentsRepository.save(globalComponent);
  }

  async findAll(): Promise<GlobalComponent[]> {
    return this.globalComponentsRepository.find();
  }

  async findOne(id: string): Promise<GlobalComponent> {
    const globalComponent = await this.globalComponentsRepository.findOne(id);

    if (!globalComponent) {
      throw new NotFoundException('Componente global no encontrado');
    }

    return globalComponent;
  }

  async update(id: string, updateGlobalComponentDto: UpdateGlobalComponentDto): Promise<GlobalComponent> {
    const globalComponent = await this.findOne(id);

    if (updateGlobalComponentDto.component_type_id) {
      updateGlobalComponentDto.componentType = { id: updateGlobalComponentDto.component_type_id };
    }

    await this.globalComponentsRepository.update(id, {
      ...updateGlobalComponentDto,
      componentType: updateGlobalComponentDto.componentType,
    });

    return this.globalComponentsRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const globalComponent = await this.findOne(id);

    await this.globalComponentsRepository.delete(id);
  }
}
