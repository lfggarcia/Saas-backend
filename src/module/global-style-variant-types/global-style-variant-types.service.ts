import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGlobalStyleVariantTypeDto } from './dto/create-global-style-variant-type.dto';
import { UpdateGlobalStyleVariantTypeDto } from './dto/update-global-style-variant-type.dto';
import { BaseService } from '../../common/base.service';
import { GlobalStyleVariantTypes } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class GlobalStyleVariantTypesService {
	private baseService: BaseService<GlobalStyleVariantTypes>;

	constructor(
		@InjectRepository(GlobalStyleVariantTypes)
		private readonly globalStyleVariantTypesRepository: Repository<GlobalStyleVariantTypes>
	) {
		this.baseService = new BaseService(this.globalStyleVariantTypesRepository);
	}

  create(createGlobalStyleVariantTypeDto: CreateGlobalStyleVariantTypeDto) {
    const globalStyleVariantType = this.globalStyleVariantTypesRepository.create(createGlobalStyleVariantTypeDto);
		return this.globalStyleVariantTypesRepository.save(globalStyleVariantType);
  }

  findAll(query: Partial<CreateGlobalStyleVariantTypeDto>) {
    const buildFilters = (q: any) => {
			const filters: FindOptionsWhere<GlobalStyleVariantTypes> = {};
			if (q.id) filters.id = q.id;
			if (q.name) filters.name = q.name;
			if (q.description) filters.description = q.description;
			return filters;
		};

		return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
    return this.globalStyleVariantTypesRepository.findOne({ where: { id } });
  }

  async update(id: string, updateGlobalStyleVariantTypeDto: UpdateGlobalStyleVariantTypeDto) {
		const globalStyleVariantType = await this.globalStyleVariantTypesRepository.findOne({
			where: { id }
		});
		if (!globalStyleVariantType) {
			throw new NotFoundException(`GlobalStyleVariantType with ID ${id} does not exist.`);
		}
		const updatedGlobalStyleVariantType = this.globalStyleVariantTypesRepository.merge(globalStyleVariantType, updateGlobalStyleVariantTypeDto);
		return this.globalStyleVariantTypesRepository.save(updatedGlobalStyleVariantType);
  }

  async remove(id: string) {
    const globalStyleVariantType = await this.globalStyleVariantTypesRepository.findOne({
			where: { id }
		});
		if (!globalStyleVariantType) {
			throw new NotFoundException(`GlobalStyleVariantType with ID ${id} does not exist.`);
		}
		return this.globalStyleVariantTypesRepository.remove(globalStyleVariantType);
  }
}
