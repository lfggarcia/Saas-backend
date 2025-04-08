import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStyleAliasDto } from './dto/create-style-alias.dto';
import { UpdateStyleAliasDto } from './dto/update-style-alias.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StyleAliases } from '../../entities';
import { FindOptionsWhere, Repository } from 'typeorm';
import { BaseService } from '../../common/base.service';

@Injectable()
export class StyleAliasesService {
	private baseService: BaseService<StyleAliases>;

	constructor(
		@InjectRepository(StyleAliases)
		private readonly styleAliasesRepository: Repository<StyleAliases>,
	) {
		this.baseService = new BaseService(this.styleAliasesRepository);
	}

  create(createStyleAliasDto: CreateStyleAliasDto) {
    const styleAlias = this.styleAliasesRepository.create(createStyleAliasDto);
		return this.styleAliasesRepository.save(styleAlias);
  }

	async findAll(query: any) {
		const buildFilters = (q: any) => {
      const filters: FindOptionsWhere<StyleAliases> = {};
      if (q.shortKey) filters.shortKey = q.shortKey;
      if (q.propertyName) filters.propertyName = q.propertyName;
      return filters;
    };

    return this.baseService.findAll(query, buildFilters);
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
