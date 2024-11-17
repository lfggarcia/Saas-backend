import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Aliases } from '../../../entities';
import { paginate } from '../../../commons/decorators/paginate.decorator';

@Injectable()
export class AliasesService {
	constructor(
		@InjectRepository(Aliases)
		private readonly aliasesRepository: Repository<Aliases>,
	) {}

	async findAll(query: any) {
		return paginate(this.aliasesRepository, {}, query);
	}

	async findOne(id: Aliases['id']) {
		return this.aliasesRepository.findOne({ where: { id } });
	}

	async create(data: Aliases) {
		return this.aliasesRepository.save(data);
	}

	async update(id: Aliases['id'], data: Aliases) {
		return this.aliasesRepository.update(id, data);
	}

	async remove(id: Aliases['id']) {
		return this.aliasesRepository.delete(id);
	}
}
