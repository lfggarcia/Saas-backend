import { Injectable } from '@nestjs/common';
import { CreatePropertyAliasDto } from './dto/create-property-alias.dto';
import { UpdatePropertyAliasDto } from './dto/update-property-alias.dto';
import { BaseService } from '../../common/base.service';
import { PropertyAliases } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class PropertyAliasesService {

	private baseService: BaseService<PropertyAliases>;

	constructor(
		@InjectRepository(PropertyAliases)
		private readonly propertyAliasesRepository: Repository<PropertyAliases>,
	) {
		this.baseService = new BaseService<PropertyAliases>(this.propertyAliasesRepository);
	}

  create(createPropertyAliasDto: CreatePropertyAliasDto) {
    const propertyAlias = this.propertyAliasesRepository.create(createPropertyAliasDto);
		return this.propertyAliasesRepository.save(propertyAlias);
  }

  findAll(query: Partial<CreatePropertyAliasDto>) {
		const filters = (q: Partial<CreatePropertyAliasDto & FindOptionsWhere<PropertyAliases>>) => {
			const filter:FindOptionsWhere<PropertyAliases> = {};
			if (q.alias) filter.alias = q.alias;
			if (q.id) filter.id = q.id;
			if (q.mapsTo) filter.mapsTo = q.mapsTo;
			return filter;
		}
    return this.baseService.findAll(query, filters);
  }

  findOne(id: string) {
    return this.propertyAliasesRepository.findOne({
			where: { id },
		});
  }

  async update(id: string, updatePropertyAliasDto: UpdatePropertyAliasDto) {
    const propertyAlias = await this.findOne(id);
		if (!propertyAlias) {
			throw new Error(`PropertyAlias with id ${id} not found`);
		}
		const updatedPropertyAlias = this.propertyAliasesRepository.merge(propertyAlias, updatePropertyAliasDto);
		return this.propertyAliasesRepository.save(updatedPropertyAlias);
  }

  async remove(id: string) {
    const propertyAlias = await this.findOne(id);
		if (!propertyAlias) {
			throw new Error(`PropertyAlias with id ${id} not found`);
		}
		await this.propertyAliasesRepository.remove(propertyAlias);
		return propertyAlias;
  }
}
