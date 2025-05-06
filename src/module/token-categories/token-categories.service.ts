import { Injectable } from '@nestjs/common';
import { CreateTokenCategoryDto } from './dto/create-token-category.dto';
import { UpdateTokenCategoryDto } from './dto/update-token-category.dto';
import { TokenCategories } from '../../entities';
import { BaseService } from '../../common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class TokenCategoriesService {
	private baseService: BaseService<TokenCategories>;

	constructor(
		@InjectRepository(TokenCategories)
		private readonly tokenCategoriesRepository: Repository<TokenCategories>,
	) {
		this.baseService = new BaseService<TokenCategories>(this.tokenCategoriesRepository);
	}

  create(createTokenCategoryDto: CreateTokenCategoryDto) {
    const tokenCategory = this.tokenCategoriesRepository.create(createTokenCategoryDto);
		return this.tokenCategoriesRepository.save(tokenCategory);
  }

  findAll(query: Partial<CreateTokenCategoryDto>) {
		const filters = (q: Partial<CreateTokenCategoryDto & FindOptionsWhere<TokenCategories>>) => {
			const filter: FindOptionsWhere<TokenCategories> = {};
			if (q.name) filter.name = q.name;
			return filter;
		}
		return this.baseService.findAll(query, filters);
  }

  findOne(id: string) {
    return this.tokenCategoriesRepository.findOne({
			where: { id },
		});
  }

  async update(id: string, updateTokenCategoryDto: UpdateTokenCategoryDto) {
    const tokenCategory = await this.findOne(id);
		if (!tokenCategory) {
			throw new Error(`TokenCategory with id ${id} not found`);
		}
		const updatedTokenCategory = this.tokenCategoriesRepository.merge(tokenCategory, updateTokenCategoryDto);
		return this.tokenCategoriesRepository.save(updatedTokenCategory);
  }

  async remove(id: string) {
    const tokenCategory = await this.findOne(id);
		if (!tokenCategory) {
			throw new Error(`TokenCategory with id ${id} not found`);
		}
		await this.tokenCategoriesRepository.remove(tokenCategory);
		return tokenCategory;
  }
}
