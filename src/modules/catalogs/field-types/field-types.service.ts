import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FieldTypes } from '../../../entities';
import { paginate } from '../../../commons/decorators/paginate.decorator';

@Injectable()
export class FieldTypesService {
	constructor(
		@InjectRepository(FieldTypes)
		private readonly fieldTypesRepository: Repository<FieldTypes>,
	) {}

	async findAll(query: any) {
		return paginate(this.fieldTypesRepository, {}, query);
	}

	async findOne(id: FieldTypes['id']) {
		return this.fieldTypesRepository.findOne({ where: { id } });
	}

	async create(data: FieldTypes) {
		return this.fieldTypesRepository.save(data);
	}

	async update(id: FieldTypes['id'], data: FieldTypes) {
		return this.fieldTypesRepository.update(id, data);
	}

	async remove(id: FieldTypes['id']) {
		return this.fieldTypesRepository.delete(id);
	}
}
