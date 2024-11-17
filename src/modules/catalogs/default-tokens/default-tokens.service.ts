import { Injectable } from '@nestjs/common';

import { DefaultTokens } from '../../../entities';
import { paginate } from '../../../commons/decorators/paginate.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DefaultTokensService {
	constructor(
		@InjectRepository(DefaultTokens)
		private readonly defaultTokensRepository: Repository<DefaultTokens>,
	) {}

	async findAll(query: any) {
		return paginate(this.defaultTokensRepository, {}, query);
	}

	async findOne(id: DefaultTokens['id']) {
		return this.defaultTokensRepository.findOne({ where: { id } });
	}

	async create(data: DefaultTokens) {
		return this.defaultTokensRepository.save(data);
	}

	async update(id: DefaultTokens['id'], data: DefaultTokens) {
		return this.defaultTokensRepository.update(id, data);
	}

	async remove(id: DefaultTokens['id']) {
		return this.defaultTokensRepository.delete(id);
	}
}
