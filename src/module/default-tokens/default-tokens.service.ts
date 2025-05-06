import { Injectable } from '@nestjs/common';
import { CreateDefaultTokenDto } from './dto/create-default-token.dto';
import { UpdateDefaultTokenDto } from './dto/update-default-token.dto';
import { DefaultTokens } from '../../entities';
import { BaseService } from '../../common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { TokenCategoriesService } from '../token-categories/token-categories.service';

@Injectable()
export class DefaultTokensService {
	private baseService: BaseService<DefaultTokens>;

	constructor(
		@InjectRepository(DefaultTokens)
		private readonly defaultTokensRepository: Repository<DefaultTokens>,
		private readonly tokenCategoriesService: TokenCategoriesService,
	) {
		this.baseService = new BaseService<DefaultTokens>(this.defaultTokensRepository);
	}

  async create(createDefaultTokenDto: CreateDefaultTokenDto) {
		const {categoryId,...restData } = createDefaultTokenDto;
		const data:DeepPartial<DefaultTokens> = {
			...restData,
		}
		const category = await this.tokenCategoriesService.findOne(categoryId);
		if (!category) {
			throw new Error(`Category with id ${categoryId} not found`);
		}
		data.category = category;

		const defaultToken = this.defaultTokensRepository.create(data);
		return this.defaultTokensRepository.save(defaultToken);
  }

  findAll(query: Partial<CreateDefaultTokenDto>) {
		const filters = (q: Partial<CreateDefaultTokenDto & FindOptionsWhere<DefaultTokens>>) => {
			const filter:FindOptionsWhere<DefaultTokens> = {};
			if (q.categoryId) filter.categoryId = q.categoryId;
			if (q.key) filter.key = q.key;
			if (q.id) filter.id = q.id;
			if (q.value) filter.value = q.value;
			return filter;
		}
		const relations: FindOptionsRelations<DefaultTokens> = {
			category: true,
		};
    return this.baseService.findAll(query, filters, relations);
  }

  findOne(id: string) {
		return this.defaultTokensRepository.findOne({
			where: { id },
			relations: {
				category: true,
			},
		});
  }

  async update(id: string, updateDefaultTokenDto: UpdateDefaultTokenDto) {
		const defaultToken = await this.findOne(id);
		if (!defaultToken) {
			throw new Error(`DefaultToken with id ${id} not found`);
		}
		const {categoryId,...restData } = updateDefaultTokenDto;
		const data:DeepPartial<DefaultTokens> = {
			...restData,
		}
		if (categoryId) {
			const category = await this.tokenCategoriesService.findOne(categoryId);
			if (!category) {
				throw new Error(`Category with id ${categoryId} not found`);
			}
			data.category = category;
		}
		const updatedDefaultToken = this.defaultTokensRepository.merge(defaultToken, data);
		return this.defaultTokensRepository.save(updatedDefaultToken);
  }

  async remove(id: string) {
		const defaultToken = await this.findOne(id);
		if (!defaultToken) {
			throw new Error(`DefaultToken with id ${id} not found`);
		}
		await this.defaultTokensRepository.remove(defaultToken);
		return defaultToken;
  }
}
