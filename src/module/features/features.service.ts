import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { BaseService } from '../../common/base.service';
import { Features } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { NavigationsService } from '../navigations/navigations.service';
import { ResponseFeaturesDto } from './dto/response-feature.dto';

@Injectable()
export class FeaturesService {
	private baseService: BaseService<Features>;

	constructor(
		@InjectRepository(Features)
		private readonly featuresRepository: Repository<Features>,
		private readonly navigationsService: NavigationsService
	) {
		this.baseService = new BaseService<Features>(this.featuresRepository,ResponseFeaturesDto);
	}

  async create(createFeatureDto: CreateFeatureDto) {
		const { navigationId, ...data } = createFeatureDto;
		const createFeatureData: DeepPartial<Features> = {
			...data,
		};
		const navigation = await this.navigationsService.findOne(navigationId);
		if (!navigation) {
			throw new NotFoundException(`Navigation with ID ${navigationId} does not exist.`);
		}
		createFeatureData.navigation = navigation;
		const feature = this.featuresRepository.create(createFeatureData);
		return this.featuresRepository.save(feature);
  }

  findAll(query: Partial<CreateFeatureDto>) {
		const buildFilters = (q: Partial<CreateFeatureDto & FindOptionsWhere<Features>>) => {
			const filters: FindOptionsWhere<Features> = {};
			if (q.id) filters.id = q.id;
			if (q.name) filters.name = q.name;
			if (q.version) filters.version = q.version;
			if ("isActive" in q) filters.isActive = q.isActive;
			if (q.navigationId) filters.navigation = { id: q.navigationId };
			return filters;
		};

		const relations: FindOptionsRelations<Features> = {
			navigation: true,
		};
		return this.baseService.findAll(query, buildFilters, relations);
  }

  findOne(id: string) {
    return this.featuresRepository.findOne({ where: { id }});
  }

  async update(id: string, updateFeatureDto: UpdateFeatureDto) {
    const feature = await this.featuresRepository.findOne({
			where: { id }
		});
		if (!feature) {
			throw new NotFoundException(`Feature with ID ${id} does not exist.`);
		}
		const { navigationId, ...data } = updateFeatureDto;
		const updateFeatureData: DeepPartial<Features> = {
			...data,
		};
		if (!navigationId) {
			throw new NotFoundException('Navigation ID is required');
		}
		const navigation = await this.navigationsService.findOne(navigationId);
		if (!navigation) {
			throw new NotFoundException(`Navigation with ID ${navigationId} does not exist.`);
		}
		updateFeatureData.navigation = navigation;
		const updatedFeature = this.featuresRepository.merge(feature, updateFeatureData);
		return this.featuresRepository.save(updatedFeature);
  }

  async remove(id: string) {
    const feature = await this.featuresRepository.findOne({
			where: { id }
		});
		if (!feature) {
			throw new NotFoundException(`Feature with ID ${id} does not exist.`);
		}
		return this.featuresRepository.remove(feature);
  }
}
