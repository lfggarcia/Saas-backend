import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComponentPoolPropertyDto } from './dto/create-component-pool-property.dto';
import { UpdateComponentPoolPropertyDto } from './dto/update-component-pool-property.dto';
import { BaseService } from '../../common/base.service';
import { ComponentPoolProperties } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Not, Repository } from 'typeorm';
import { PropertyTypesService } from '../property_types/property_types.service';
import { ComponentPoolService } from '../component-pool/component-pool.service';

@Injectable()
export class ComponentPoolPropertiesService {
	private baseService: BaseService<ComponentPoolProperties>;

	constructor(
		@InjectRepository(ComponentPoolProperties)
		private readonly componentPoolPropertiesRepository: Repository<ComponentPoolProperties>,
		private readonly propertyTypesService: PropertyTypesService,
		private readonly componentPoolService: ComponentPoolService
	) {
		this.baseService = new BaseService<ComponentPoolProperties>(this.componentPoolPropertiesRepository);
	}

  async create(createComponentPoolPropertyDto: CreateComponentPoolPropertyDto) {

    const {
			componentId,
			typeId,
			...data
		} = createComponentPoolPropertyDto;
		const newComponentPoolProperty: DeepPartial<ComponentPoolProperties> = {
			...data
		};

		if (!componentId) {
			throw new NotFoundException(`Component ID is required.`);
		}
		const component = await this.componentPoolService.findOne(componentId);
		if (!component) {
			throw new NotFoundException(`Component with ID ${componentId} does not exist.`);
		}
		newComponentPoolProperty.component = component;

		if (!typeId) {
			throw new NotFoundException(`Property Type ID is required.`);
		}
		const propertyType = await this.propertyTypesService.findOne(typeId);
		if (!propertyType) {
			throw new NotFoundException(`Property Type with ID ${typeId} does not exist.`);
		}
		newComponentPoolProperty.type = propertyType;
		const componentPoolProperty = this.componentPoolPropertiesRepository.create(newComponentPoolProperty);
		return this.componentPoolPropertiesRepository.save(componentPoolProperty);
  }

  async findAll(query: Partial<CreateComponentPoolPropertyDto>) {
    const buildFilters = (q: Partial<CreateComponentPoolPropertyDto & FindOptionsWhere<ComponentPoolProperties>>) => {
			const filters: FindOptionsWhere<ComponentPoolProperties> = {};
			if (q.id) filters.id = q.id;
			if (q.typeId) filters.type = { id: q.typeId };
			if (q.componentId) filters.component = { id: q.componentId };
			if (q.key) filters.key = q.key;
			if (q.defaultValue) filters.defaultValue = q.defaultValue;
			return filters;
		};
		return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
		return this.componentPoolPropertiesRepository.findOne({ where: { id }});
  }

  async update(id: string, updateComponentPoolPropertyDto: UpdateComponentPoolPropertyDto) {
    const {
			componentId,
			typeId,
			...data
		} = updateComponentPoolPropertyDto;

		const updateComponentPoolPropertyData: DeepPartial<ComponentPoolProperties> = {
			...data
		};

		if (!componentId) {
			throw new NotFoundException(`Component ID is required.`);
		}
		const component = await this.componentPoolService.findOne(componentId);
		if (!component) {
			throw new NotFoundException(`Component with ID ${componentId} does not exist.`);
		}
		updateComponentPoolPropertyData.component = component;

		if (!typeId) {
			throw new NotFoundException(`Property Type ID is required.`);
		}
		const propertyType = await this.propertyTypesService.findOne(typeId);
		if (!propertyType) {
			throw new NotFoundException(`Property Type with ID ${typeId} does not exist.`);
		}
		updateComponentPoolPropertyData.type = propertyType;
		const componentPoolProperty = await this.componentPoolPropertiesRepository.findOne({
			where: { id }
		});
		if (!componentPoolProperty) {
			throw new NotFoundException(`Component Pool Property with ID ${id} does not exist.`);
		}
		const updatedComponentPoolProperty = this.componentPoolPropertiesRepository.merge(
			componentPoolProperty,
			updateComponentPoolPropertyData
		);
		return this.componentPoolPropertiesRepository.save(updatedComponentPoolProperty);
  }

  async remove(id: string) {
		const componentPoolProperty = await this.componentPoolPropertiesRepository.findOne({
			where: { id }
		});
		if (!componentPoolProperty) {
			throw new NotFoundException(`Component Pool Property with ID ${id} does not exist.`);
		}
		return this.componentPoolPropertiesRepository.remove(componentPoolProperty);
  }
}
