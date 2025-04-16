import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComponentPoolDto } from './dto/create-component-pool.dto';
import { UpdateComponentPoolDto } from './dto/update-component-pool.dto';
import { BaseService } from '../../common/base.service';
import { ComponentPool } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { ComponentTypesService } from '../component_types/component_types.service';

@Injectable()
export class ComponentPoolService {
	private baseService: BaseService<ComponentPool>;

	constructor(
		@InjectRepository(ComponentPool)
		private readonly componentPoolRepository: Repository<ComponentPool>,
		private readonly componentTypesService: ComponentTypesService
	) {
		this.baseService = new BaseService<ComponentPool>(this.componentPoolRepository);
	}

  async create(createComponentPoolDto: CreateComponentPoolDto) {
    const { typeId, ...data } = createComponentPoolDto;
		const createComponentPoolData:DeepPartial<ComponentPool> = {
			...data,
		};

		const componentType = await this.componentTypesService.findOne(typeId);
		if (!componentType) {
			throw new NotFoundException(`Component Type with ID ${typeId} does not exist.`);
		}
		createComponentPoolData.type = componentType;
		const componentPool = this.componentPoolRepository.create(createComponentPoolData);
		return this.componentPoolRepository.save(componentPool);
  }

  findAll(query: Partial<CreateComponentPoolDto>) {
		const buildFilters = (q: Partial<CreateComponentPoolDto & FindOptionsWhere<ComponentPool>>) => {
			const filters: FindOptionsWhere<ComponentPool> = {};
			if (q.id) filters.id = q.id;
			if (q.name) filters.name = q.name;
			if (q.description) filters.description = q.description;
			if (q.typeId) filters.type = { id: q.typeId };
			return filters;
		};
		return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
		return this.componentPoolRepository.findOne({ where: { id }});
  }

  async update(id: string, updateComponentPoolDto: UpdateComponentPoolDto) {
    const { typeId, ...data } = updateComponentPoolDto;
		const componentPool = await this.componentPoolRepository.findOne({
			where: { id }
		});
		if (!componentPool) {
			throw new NotFoundException(`Component Pool with ID ${id} does not exist.`);
		}
		if(!typeId) {
			throw new NotFoundException(`Component Type with ID ${typeId} does not exist.`);
		}
		const componentType = await this.componentTypesService.findOne(typeId);
		if (!componentType) {
			throw new NotFoundException(`Component Type with ID ${typeId} does not exist.`);
		}
		const updateComponentPoolData: DeepPartial<ComponentPool> = {
			...data,
		};
		updateComponentPoolData.type = componentType;
		const updatedComponentPool = this.componentPoolRepository.merge(
			componentPool,
			updateComponentPoolData
		);
		return this.componentPoolRepository.save(updatedComponentPool);
  }

  async remove(id: string) {
    const componentPool = await this.componentPoolRepository.findOne({
			where: { id }
		});
		if (!componentPool) {
			throw new NotFoundException(`Component Pool with ID ${id} does not exist.`);
		}
		return this.componentPoolRepository.remove(componentPool);
  }
}
