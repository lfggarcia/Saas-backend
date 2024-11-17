import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ComponentTypes } from '../../../entities';
import { paginate } from '../../../commons/decorators/paginate.decorator';

@Injectable()
export class ComponentTypesService {
	constructor(
		@InjectRepository(ComponentTypes)
		private readonly componentTypesRepository: Repository<ComponentTypes>,
	) {}

	async findAll(query: any) {
		return paginate(this.componentTypesRepository, {}, query);
	}

	async findOne(id: ComponentTypes['id']) {
		return this.componentTypesRepository.findOne({ where: { id } });
	}

	async create(data: ComponentTypes) {
		return this.componentTypesRepository.save(data);
	}

	async update(id: ComponentTypes['id'], data: ComponentTypes) {
		return this.componentTypesRepository.update(id, data);
	}

	async remove(id: ComponentTypes['id']) {
		return this.componentTypesRepository.delete(id);
	}
}
