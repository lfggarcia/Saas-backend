import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNavigationDto } from './dto/create-navigation.dto';
import { UpdateNavigationDto } from './dto/update-navigation.dto';
import { Navigations } from '../../entities';
import { BaseService } from '../../common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { AppsService } from '../apps/apps.service';
import { NavigationTypesService } from '../navigation-types/navigation-types.service';

@Injectable()
export class NavigationsService {
	private baseService: BaseService<Navigations>;

	constructor(
		@InjectRepository(Navigations)
		private readonly navigationsRepository: Repository<Navigations>,
		private readonly appsService: AppsService,
		private readonly navigationTypeService: NavigationTypesService
	) {
		this.baseService = new BaseService(this.navigationsRepository);
	}

  async create(createNavigationDto: CreateNavigationDto) {
		const {appId,typeId,...data} = createNavigationDto
		const createdNavigationData: DeepPartial<Navigations> = {...data}

		if (!appId) {
			throw new NotFoundException(`App with ID ${appId} does not exist.`);
		}
		const app = await this.appsService.findOne(appId);
		if (!app) {
			throw new NotFoundException(`App with ID ${appId} does not exist.`);
		}
		createdNavigationData.app = app;

		if (!typeId) {
			throw new NotFoundException(`Navigation Type with ID ${typeId} does not exist.`);
		}

		const navigationType = await this.navigationTypeService.findOne(typeId);
		if (!navigationType) {
			throw new NotFoundException(`Navigation Type with ID ${typeId} does not exist.`);
		}
		createdNavigationData.type = navigationType;

		const navigation = this.navigationsRepository.create(createdNavigationData);
		return this.navigationsRepository.save(navigation);
  }

  findAll(query: Partial<CreateNavigationDto>) {
    const buildFilters = (q: Partial<CreateNavigationDto & FindOptionsWhere<Navigations>>) => {
			const filters: FindOptionsWhere<Navigations> = {};
			if (q.id) filters.id = q.id;
			if (q.name) filters.name = q.name;
			if (q.appId) filters.app = { id: q.appId };
			if (q.typeId) filters.type = { id: q.typeId };
			return filters;
		};
		return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
    return this.navigationsRepository.findOne({ where: { id } });
  }

  async update(id: string, updateNavigationDto: UpdateNavigationDto) {
		const {appId,typeId,...data} = updateNavigationDto
		const updatedNavigationData: DeepPartial<Navigations> = {...data}
		const navigation = await this.navigationsRepository.findOne({
			where: { id }
		});
		if (!navigation) {
			throw new NotFoundException(`Navigation with ID ${id} does not exist.`);
		}
		if(!appId) {
			throw new NotFoundException(`App with ID ${appId} does not exist.`);
		}
		if (appId !== navigation.app.id) {
			throw new NotFoundException(`App with ID ${appId} does not own this navigation.`);
		}
		if(!typeId) {
			throw new NotFoundException(`Navigation Type with ID ${typeId} does not exist.`);
		}
		const navigationType = await this.navigationTypeService.findOne(typeId);
		if (!navigationType) {
			throw new NotFoundException(`Navigation Type with ID ${updateNavigationDto.typeId} does not exist.`);
		}
		updatedNavigationData.type = navigationType;
		const updatedNavigation = this.navigationsRepository.merge(navigation, updatedNavigationData);
		return this.navigationsRepository.save(updatedNavigation);
  }

  async remove(id: string) {
    const navigation = await this.navigationsRepository.findOne({
			where: { id }
		});
		if (!navigation) {
			throw new NotFoundException(`Navigation with ID ${id} does not exist.`);
		}
		return this.navigationsRepository.remove(navigation);
  }
}
