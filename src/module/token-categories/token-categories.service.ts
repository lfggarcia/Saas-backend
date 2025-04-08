import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTokenCategoryDto } from './dto/create-token-category.dto';
import { UpdateTokenCategoryDto } from './dto/update-token-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenCategories } from '../../entities';
import { FindOptionsWhere, Repository } from 'typeorm';
import { BaseService } from '../../common/base.service';

@Injectable()
export class TokenCategoriesService {
	private baseService: BaseService<TokenCategories>;

	constructor(
		@InjectRepository(TokenCategories)
		private readonly tokenCategoriesRepository: Repository<TokenCategories>
	) {
		this.baseService = new BaseService(this.tokenCategoriesRepository);
	}

  create(createTokenCategoryDto: CreateTokenCategoryDto) {
    const tokenCategory = this.tokenCategoriesRepository.create(createTokenCategoryDto);
		return this.tokenCategoriesRepository.save(tokenCategory);
  }

  findAll(query: Partial<CreateTokenCategoryDto>) {
    const buildFilters = (q: any) => {
			const filters: FindOptionsWhere<TokenCategories> = {};
			if (q.id) filters.id = q.id;
			if (q.name) filters.name = q.name;
			return filters;
		};

		return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
    return this.tokenCategoriesRepository.findOne({ where: { id } });
  }

  async update(id: string, updateTokenCategoryDto: UpdateTokenCategoryDto) {
		const tokenCategory = await this.tokenCategoriesRepository.findOne({
			where: { id }
		});
		if (!tokenCategory) {
			throw new NotFoundException(`TokenCategory with ID ${id} does not exist.`);
		}
		const updatedTokenCategory = this.tokenCategoriesRepository.merge(tokenCategory, updateTokenCategoryDto);
		return this.tokenCategoriesRepository.save(updatedTokenCategory);
  }

  async remove(id: string) {
    const tokenCategory = await this.tokenCategoriesRepository.findOne({ where: { id } });
		if (!tokenCategory) {
			throw new NotFoundException(`TokenCategory with ID ${id} does not exist.`);
		}
		return this.tokenCategoriesRepository.remove(tokenCategory);
  }
}
