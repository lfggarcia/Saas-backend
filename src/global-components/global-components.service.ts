import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GlobalComponent } from '../entities/global-component.entity';
import { CreateGlobalComponentDto } from './dto/create-global-component.dto/create-global-component.dto';

@Injectable()
export class GlobalComponentsService {
  constructor(
    @InjectRepository(GlobalComponent)
    private globalComponentsRepository: Repository<GlobalComponent>,
  ) {}

  // Obtener todos los componentes globales
  getAllGlobalComponents() {
    return this.globalComponentsRepository.find();
  }

  // Obtener un componente global específico
  getGlobalComponentById(id: string) {
    return this.globalComponentsRepository.findOne({ where: { id } });
  }

  // Crear un nuevo componente global
  createGlobalComponent(createGlobalComponentDto: CreateGlobalComponentDto) {
    const newGlobalComponent = this.globalComponentsRepository.create(createGlobalComponentDto);
    return this.globalComponentsRepository.save(newGlobalComponent);
  }

  // Actualizar un componente global existente
  async updateGlobalComponent(id: string, updateGlobalComponentDto: CreateGlobalComponentDto) {
    const globalComponent = await this.globalComponentsRepository.findOne({ where: { id } });
    if (!globalComponent) {
      throw new Error('Global Component not found');
    }
    Object.assign(globalComponent, updateGlobalComponentDto);  // Actualizamos los campos
    return this.globalComponentsRepository.save(globalComponent);
  }

  // Eliminar un componente global
  deleteGlobalComponent(id: string) {
    return this.globalComponentsRepository.delete(id);
  }
}
