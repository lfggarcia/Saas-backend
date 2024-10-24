import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenGroupAlias } from '../entities/token-group-alias.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TokenGroupAliasesService {
  constructor(
    @InjectRepository(TokenGroupAlias)
    private tokenGroupAliasesRepository: Repository<TokenGroupAlias>,
  ) {}

  findAll(): Promise<TokenGroupAlias[]> {
    return this.tokenGroupAliasesRepository.find({
      relations: ['tokenGroup', 'alias'],
    });
  }

  findOne(token_group_id: string, alias_id: string): Promise<TokenGroupAlias> {
    return this.tokenGroupAliasesRepository.findOne({
      where: { token_group_id, alias_id },
      relations: ['tokenGroup', 'alias'],
    });
  }

  create(tokenGroupAlias: Partial<TokenGroupAlias>): Promise<TokenGroupAlias> {
    const newTokenGroupAlias = this.tokenGroupAliasesRepository.create(tokenGroupAlias);
    return this.tokenGroupAliasesRepository.save(newTokenGroupAlias);
  }

	async update(
		token_group_id: string,
		alias_id: string,
		tokenGroupAlias: Partial<TokenGroupAlias>,
	): Promise<TokenGroupAlias> {
		await this.tokenGroupAliasesRepository.update({ token_group_id, alias_id }, tokenGroupAlias);
		return this.tokenGroupAliasesRepository.findOne({
			where: { token_group_id, alias_id },
			relations: ['tokenGroup', 'alias'],
		});
	}

  async remove(token_group_id: string, alias_id: string): Promise<void> {
    await this.tokenGroupAliasesRepository.delete({ token_group_id, alias_id });
  }
}
