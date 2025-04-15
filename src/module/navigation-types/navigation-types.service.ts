import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNavigationTypeDto } from './dto/create-navigation-type.dto';
import { UpdateNavigationTypeDto } from './dto/update-navigation-type.dto';
import { NavigationTypes } from '../../entities';
import { BaseService } from '../../common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class NavigationTypesService {
	private baseService: BaseService<NavigationTypes>;

	constructor(
		@InjectRepository(NavigationTypes)
		private readonly navigationTypesRepository: Repository<NavigationTypes>
	){
		this.baseService = new BaseService(this.navigationTypesRepository);
	}

  create(createNavigationTypeDto: CreateNavigationTypeDto) {
    const navigationType = this.navigationTypesRepository.create(createNavigationTypeDto);
		return this.navigationTypesRepository.save(navigationType);
  }

  findAll(query: Partial<CreateNavigationTypeDto>) {
    const buildFilters = (q: any) => {
			const filters: FindOptionsWhere<NavigationTypes> = {};
			if (q.id) filters.id = q.id;
			if (q.name) filters.name = q.name;
			return filters;
		};

		return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
    return this.navigationTypesRepository.findOne({ where: { id } });
  }

  async update(id: string, updateNavigationTypeDto: UpdateNavigationTypeDto) {
    const navigationType = await this.navigationTypesRepository.findOne({
			where: { id }
		});
		if (!navigationType) {
			throw new NotFoundException(`NavigationType with ID ${id} does not exist.`);
		}
		const updatedNavigationType = this.navigationTypesRepository.merge(navigationType, updateNavigationTypeDto);
		return this.navigationTypesRepository.save(updatedNavigationType);
  }

  async remove(id: string) {
    const navigationType = await this.navigationTypesRepository.findOne({
			where: { id }
		});
		if (!navigationType) {
			throw new NotFoundException(`NavigationType with ID ${id} does not exist.`);
		}
		return this.navigationTypesRepository.remove(navigationType);
  }
}
