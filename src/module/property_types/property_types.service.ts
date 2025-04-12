import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyTypeDto } from './dto/create-property_type.dto';
import { UpdatePropertyTypeDto } from './dto/update-property_type.dto';
import { PropertyTypes } from '../../entities';
import { BaseService } from '../../common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class PropertyTypesService {
	private baseService: BaseService<PropertyTypes>;

	constructor(
		@InjectRepository(PropertyTypes)
		private readonly propertyTypesRepository: Repository<PropertyTypes>
	) {
		this.baseService = new BaseService(this.propertyTypesRepository);
	}


  create(createPropertyTypeDto: CreatePropertyTypeDto) {
    const propertyType = this.propertyTypesRepository.create(createPropertyTypeDto);
		return this.propertyTypesRepository.save(propertyType);
  }

  findAll(query: Partial<CreatePropertyTypeDto>) {
    const buildFilters = (q: any) => {
			const filters: FindOptionsWhere<PropertyTypes> = {};
			if (q.id) filters.id = q.id;
			if (q.name) filters.name = q.name;
			if (q.description) filters.description = q.description;
			return filters;
		};

		return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
    return this.propertyTypesRepository.findOne({ where: { id } });
  }

  async update(id: string, updatePropertyTypeDto: UpdatePropertyTypeDto) {
		const propertyType = await this.propertyTypesRepository.findOne({
			where: { id }
		});
		if (!propertyType) {
			throw new NotFoundException(`PropertyType with ID ${id} does not exist.`);
		}
		const updatedPropertyType = this.propertyTypesRepository.merge(propertyType, updatePropertyTypeDto);
		return this.propertyTypesRepository.save(updatedPropertyType);
  }

  async remove(id: string) {
    const propertyType = await this.propertyTypesRepository.findOne({
			where: { id }
		});
		if (!propertyType) {
			throw new NotFoundException(`PropertyType with ID ${id} does not exist.`);
		}
		return this.propertyTypesRepository.remove(propertyType);
  }
}
