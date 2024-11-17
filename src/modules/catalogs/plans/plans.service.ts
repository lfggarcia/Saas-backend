import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Plans } from '../../../entities';
import { paginate } from '../../../commons/decorators/paginate.decorator';

@Injectable()
export class PlansService {
	constructor(
		@InjectRepository(Plans)
		private readonly plansRepository: Repository<Plans>,
	) {}

	async findAll(query: any) {
		return paginate(this.plansRepository, {}, query);
	}

	async findOne(id: Plans['id']) {
		return this.plansRepository.findOne({ where: { id } });
	}

	async create(data: Plans) {
		return this.plansRepository.save(data);
	}

	async update(id: Plans['id'], data: Plans) {
		return this.plansRepository.update(id, data);
	}

	async remove(id: Plans['id']) {
		return this.plansRepository.delete(id);
	}
}
