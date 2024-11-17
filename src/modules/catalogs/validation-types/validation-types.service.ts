import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ValidationTypes } from '../../../entities';
import { paginate } from '../../../commons/decorators/paginate.decorator';

@Injectable()
export class ValidationTypesService {
	constructor(
		@InjectRepository(ValidationTypes)
		private readonly validationTypesRepository: Repository<ValidationTypes>,
	) {}

	async findAll(query: any) {
		return paginate(this.validationTypesRepository, {}, query);
	}

	async findOne(id: ValidationTypes['id']) {
		return this.validationTypesRepository.findOne({ where: { id } });
	}

	async create(data: ValidationTypes) {
		return this.validationTypesRepository.save(data);
	}

	async update(id: ValidationTypes['id'], data: ValidationTypes) {
		return this.validationTypesRepository.update(id, data);
	}

	async remove(id: ValidationTypes['id']) {
		return this.validationTypesRepository.delete(id);
	}
}
