import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeatureScreenDto } from './dto/create-feature-screen.dto';
import { UpdateFeatureScreenDto } from './dto/update-feature-screen.dto';
import { BaseService } from '../../common/base.service';
import { FeatureScreens } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Not, Repository } from 'typeorm';
import { FeaturesService } from '../features/features.service';
import { ScreensService } from '../screens/screens.service';

@Injectable()
export class FeatureScreensService {
	private baseService: BaseService<FeatureScreens>;

	constructor(
		@InjectRepository(FeatureScreens)
		private readonly featureScreensRepository: Repository<FeatureScreens>,
		private readonly featuresService: FeaturesService,
		private readonly screensService: ScreensService
	) {
		this.baseService = new BaseService<FeatureScreens>(this.featureScreensRepository);
	}

  async create(createFeatureScreenDto: CreateFeatureScreenDto) {
    const {
			featureId,
			screenId,
			environment
		} = createFeatureScreenDto;
		const newFeatureScreen: DeepPartial<FeatureScreens> = {}

		if (!environment) {
			throw new NotFoundException('Environment is required');
		}
		newFeatureScreen.environment = environment;

		if (!featureId) {
			throw new NotFoundException('Feature ID is required');
		}
		const feature = await this.featuresService.findOne(featureId);
		if (!feature) {
			throw new NotFoundException(`Feature with ID ${featureId} not found`);
		}
		newFeatureScreen.feature = feature;

		if (!screenId) {
			throw new NotFoundException('Screen ID is required');
		}
		const screen = await this.screensService.findOne(screenId);
		if (!screen) {
			throw new NotFoundException(`Screen with ID ${screenId} not found`);
		}
		newFeatureScreen.screen = screen;
		const existingFeatureScreen = await this.featureScreensRepository.findOne({
			where: {
				environment: Not(newFeatureScreen.environment),
				featureId: feature.id,
				screenId: screen.id
			}
		});
		if (existingFeatureScreen) {
			throw new NotFoundException(`FeatureScreen with ID ${existingFeatureScreen.id} already exists`);
		}
		const createdFeatureScreen = await this.featureScreensRepository.create(newFeatureScreen);
		return this.featureScreensRepository.save(createdFeatureScreen);
  }

  findAll(query: Partial<CreateFeatureScreenDto>) {
    const buildFilters = (q: Partial<CreateFeatureScreenDto & FindOptionsWhere<FeatureScreens>>) => {
			const filters: FindOptionsWhere<FeatureScreens> = {};
			if (q.id) filters.id = q.id;
			if (q.featureId) filters.feature = { id: q.featureId };
			if (q.screenId) filters.screen = { id: q.screenId };
			if (q.environment) filters.environment = q.environment;
			return filters;
		}

		return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
		return this.featureScreensRepository.findOne({
			where: { id },
		});
  }

  async update(id: string, updateFeatureScreenDto: UpdateFeatureScreenDto) {
    const {
			featureId,
			screenId,
			environment
		} = updateFeatureScreenDto;

		const updateFeatureScreenData: DeepPartial<FeatureScreens> = {}

		if (!environment) {
			throw new NotFoundException('Environment is required');
		}
		updateFeatureScreenData.environment = environment;

		if (!featureId) {
			throw new NotFoundException('Feature ID is required');
		}
		const feature = await this.featuresService.findOne(featureId);
		if (!feature) {
			throw new NotFoundException(`Feature with ID ${featureId} not found`);
		}
		updateFeatureScreenData.feature = feature;
		if (!screenId) {
			throw new NotFoundException('Screen ID is required');
		}
		const screen = await this.screensService.findOne(screenId);
		if (!screen) {
			throw new NotFoundException(`Screen with ID ${screenId} not found`);
		}
		updateFeatureScreenData.screen = screen;
		const existingFeatureScreen = await this.featureScreensRepository.findOne({
			where: {
				environment: Not(environment),
				featureId: feature.id,
				screenId: screen.id
			}
		});
		if (existingFeatureScreen) {
			throw new NotFoundException(`FeatureScreen with ID ${existingFeatureScreen.id} already exists`);
		}
		const featureScreen = await this.featureScreensRepository.findOne({
			where: { id }
		});
		if (!featureScreen) {
			throw new NotFoundException(`FeatureScreen with ID ${id} not found`);
		}
		const updatedFeatureScreen = this.featureScreensRepository.merge(featureScreen, updateFeatureScreenData);
		return this.featureScreensRepository.save(updatedFeatureScreen);
  }

  async remove(id: string) {
    const featureScreen = await this.featureScreensRepository.findOne({
			where: { id }
		});
		if (!featureScreen) {
			throw new NotFoundException(`FeatureScreen with ID ${id} not found`);
		}
		return this.featureScreensRepository.remove(featureScreen);
  }
}
