import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTokenDefinitionDto } from './dto/create-token-definition.dto';
import { UpdateTokenDefinitionDto } from './dto/update-token-definition.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenDefinitions } from '../../entities';
import { FindOptionsWhere, Repository } from 'typeorm';
import { BaseService } from '../../common/base.service';

@Injectable()
export class TokenDefinitionsService {
	private baseService: BaseService<TokenDefinitions>;

	constructor(
		@InjectRepository(TokenDefinitions)
		private readonly tokenDefinitionsRepository: Repository<TokenDefinitions>
	) {
		this.baseService = new BaseService(this.tokenDefinitionsRepository);
	}

  create(createTokenDefinitionDto: CreateTokenDefinitionDto) {
    const tokenDefinition = this.tokenDefinitionsRepository.create(createTokenDefinitionDto);
		return this.tokenDefinitionsRepository.save(tokenDefinition);
  }

  findAll(query: Partial<CreateTokenDefinitionDto>) {
		const buildFilters = (q: any) => {
			const filters: FindOptionsWhere<TokenDefinitions> = {};
			if (q.id) filters.id = q.id;
			if (q.categoryId) filters.categoryId = q.categoryId;
			if (q.tokenKey) filters.tokenKey = q.tokenKey;
			if (q.tokenValue) filters.tokenValue = q.tokenValue;
			return filters;
		};

		return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
    return this.tokenDefinitionsRepository.findOne({ where: { id } });
  }

  async update(id: string, updateTokenDefinitionDto: UpdateTokenDefinitionDto) {
		const tokenDefinition = await this.tokenDefinitionsRepository.findOne({ 
			where: { id } 
		});
		if (!tokenDefinition) {
			throw new NotFoundException(`TokenDefinition with ID ${id} does not exist.`);
		}
		const updatedTokenDefinition = this.tokenDefinitionsRepository.merge(tokenDefinition, updateTokenDefinitionDto);
		return this.tokenDefinitionsRepository.save(updatedTokenDefinition);
  }

  async remove(id: string) {
    const tokenDefinition = await this.tokenDefinitionsRepository.findOne({ where: { id } });
		if (!tokenDefinition) {
			throw new NotFoundException(`TokenDefinition with ID ${id} does not exist.`);
		}
		return this.tokenDefinitionsRepository.remove(tokenDefinition);
  }
}
