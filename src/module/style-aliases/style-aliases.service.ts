import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStyleAliasDto } from './dto/create-style-alias.dto';
import { UpdateStyleAliasDto } from './dto/update-style-alias.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StyleAliases } from '../../entities';
import { Repository } from 'typeorm';

@Injectable()
export class StyleAliasesService {

	constructor(
		@InjectRepository(StyleAliases)
		private readonly styleAliasesRepository: Repository<StyleAliases>,
	) {}

  create(createStyleAliasDto: CreateStyleAliasDto) {
    const styleAlias = this.styleAliasesRepository.create(createStyleAliasDto);
		return this.styleAliasesRepository.save(styleAlias);
  }

	async findAll(query: any) {
		const buildFilters = () => {
			const filters: Partial<Record<keyof StyleAliases, any>> = {};
			if (query.shortKey) {
				filters.shortKey = query.shortKey;
			}
			if (query.propertyName) {
				filters.propertyName = query.propertyName;
			}
			return filters;
		};

		const filters = buildFilters();

		if (!query.page && !query.limit) {
			const data = await this.styleAliasesRepository.find({ where: filters });
			return { data };
		}

		const page = parseInt(query.page || '1', 10);
		const limit = parseInt(query.limit || '10', 10);
		const skip = (page - 1) * limit;

		const [data, total] = await this.styleAliasesRepository.findAndCount({
			where: filters,
			skip,
			take: limit,
		});

		return {
			data,
			pagination: {
				totalItems: total,
				currentPage: page,
				totalPages: Math.ceil(total / limit),
				itemsPerPage: limit,
			},
		};
	}

  findOne(id: string) {
    return this.styleAliasesRepository.findOne({ where: { id } });
  }

	async update(id: string, updateStyleAliasDto: UpdateStyleAliasDto) {
		const styleAlias = await this.styleAliasesRepository.findOne({ where: { id } });
		if (!styleAlias) {
			throw new NotFoundException(`StyleAlias with ID ${id} does not exist.`);
		}

		const updatedStyleAlias = this.styleAliasesRepository.merge(styleAlias, updateStyleAliasDto);
		return this.styleAliasesRepository.save(updatedStyleAlias);
	}

  async remove(id: string) {
    const styleAlias = await this.styleAliasesRepository.findOne({ where: { id } });
		if (!styleAlias) {
			throw new NotFoundException(`StyleAlias with ID ${id} does not exist.`);
		}
		return this.styleAliasesRepository.remove(styleAlias);
  }
}
