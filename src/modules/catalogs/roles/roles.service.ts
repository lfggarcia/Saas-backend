import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Roles } from '../../../entities';
import { paginate } from '../../../commons/decorators/paginate.decorator';

@Injectable()
export class RolesService {
	constructor(
		@InjectRepository(Roles)
		private readonly rolesRepository: Repository<Roles>,
	) {}

	async findAll(query: any) {
		return paginate(this.rolesRepository, {}, query);
	}

	async findOne(id: Roles['id']) {
		return this.rolesRepository.findOne({ where: { id } });
	}

	async create(data: Roles) {
		return this.rolesRepository.save(data);
	}

	async update(id: Roles['id'], data: Roles) {
		return this.rolesRepository.update(id, data);
	}

	async remove(id: Roles['id']) {
		return this.rolesRepository.delete(id);
	}
}
