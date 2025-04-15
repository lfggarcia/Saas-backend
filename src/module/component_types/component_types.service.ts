import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComponentTypeDto } from './dto/create-component_type.dto';
import { UpdateComponentTypeDto } from './dto/update-component_type.dto';
import { ComponentTypes } from '../../entities';
import { BaseService } from '../../common/base.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ComponentTypesService {
	private baseService: BaseService<ComponentTypes>;

	constructor(
		@InjectRepository(ComponentTypes)
		private readonly componentTypesRepository: Repository<ComponentTypes>
	) {
		this.baseService = new BaseService(this.componentTypesRepository);
	}

  create(createComponentTypeDto: CreateComponentTypeDto) {
    const componentType = this.componentTypesRepository.create(createComponentTypeDto);
		return this.componentTypesRepository.save(componentType);
  }

  findAll(query: Partial<CreateComponentTypeDto>) {
    const buildFilters = (q: any) => {
			const filters: FindOptionsWhere<ComponentTypes> = {};
			if (q.id) filters.id = q.id;
			if (q.name) filters.name = q.name;
			if (q.description) filters.description = q.description;
			return filters;
		};
		return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
    return this.componentTypesRepository.findOne({ where: { id } });
  }

  async update(id: string, updateComponentTypeDto: UpdateComponentTypeDto) {
    const componentType = await this.componentTypesRepository.findOne({
			where: { id }
		});
		if (!componentType) {
			throw new NotFoundException(`ComponentType with ID ${id} does not exist.`);
		}
		const updatedComponentType = this.componentTypesRepository.merge(componentType, updateComponentTypeDto);
		return this.componentTypesRepository.save(updatedComponentType);
  }

  async remove(id: string) {
    const componentType = await this.componentTypesRepository.findOne({
			where: { id }
		});
		if (!componentType) {
			throw new NotFoundException(`ComponentType with ID ${id} does not exist.`);
		}
		return this.componentTypesRepository.remove(componentType);
  }
}
