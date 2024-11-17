import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Statuses } from '../../../entities';
import { paginate } from '../../../commons/decorators/paginate.decorator';

@Injectable()
export class StatusesService {
	constructor(
		@InjectRepository(Statuses)
		private readonly statusesRepository: Repository<Statuses>,
	) {}

	async findAll(query: any) {
		return paginate(this.statusesRepository, {}, query);
	}

	async findOne(id: Statuses['id']) {
		return this.statusesRepository.findOne({ where: { id } });
	}

	async create(data: Statuses) {
		return this.statusesRepository.save(data);
	}

	async update(id: Statuses['id'], data: Statuses) {
		return this.statusesRepository.update(id, data);
	}

	async remove(id: Statuses['id']) {
		return this.statusesRepository.delete(id);
	}
}
