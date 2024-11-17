import { Injectable } from '@nestjs/common';

import { TokenGroups } from '../../../entities';
import { paginate } from '../../../commons/decorators/paginate.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TokenGroupsService {

	constructor(
		@InjectRepository(TokenGroups)
		private readonly tokenGroupsRepository: Repository<TokenGroups>,
	) {}

	async findAll(query: any) {
		return paginate(this.tokenGroupsRepository, {}, query);
	}

	async findOne(id: TokenGroups['id']) {
		return this.tokenGroupsRepository.findOne({ where: { id } });
	}

	async create(data: TokenGroups) {
		return this.tokenGroupsRepository.save(data);
	}

	async update(id: TokenGroups['id'], data: TokenGroups) {
		return this.tokenGroupsRepository.update(id, data);
	}

	async remove(id: TokenGroups['id']) {
		return this.tokenGroupsRepository.delete(id);
	}
}
