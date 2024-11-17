import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TokenGroupAliases } from '../../../entities';
import { paginate } from '../../../commons/decorators/paginate.decorator';

@Injectable()
export class TokenGroupAliasesService {
	constructor(
		@InjectRepository(TokenGroupAliases)
		private readonly tokenGroupAliasesRepository: Repository<TokenGroupAliases>,
	) {}

	async findAll(query: any) {
		return paginate(
			this.tokenGroupAliasesRepository,
			{
				relations: ['alias', 'tokenGroup'],
			},
			query
		);
	}

	async findOne(id: TokenGroupAliases['alias_id'|'token_group_id']) {
		return this.tokenGroupAliasesRepository.findOne({ 
			where: { 
				alias_id: id,
				token_group_id: id
			}
		});
	}

	async create(data: TokenGroupAliases) {
		return this.tokenGroupAliasesRepository.save(data);
	}

	async update(id: string, data: TokenGroupAliases) {
		return this.tokenGroupAliasesRepository.update(id, data);
	}

	async remove(id: string) {
		return this.tokenGroupAliasesRepository.delete(id);
	}
}
