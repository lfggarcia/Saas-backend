import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeatureVersionScreenDto } from './dto/create-feature-version-screen.dto';
import { UpdateFeatureVersionScreenDto } from './dto/update-feature-version-screen.dto';
import { BaseService } from '../../common/base.service';
import { FeatureVersionScreens } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { FeatureVersionsService } from '../feature-versions/feature-versions.service';
import { ScreenVersionsService } from '../screen-versions/screen-versions.service';

@Injectable()
export class FeatureVersionScreensService {
	private baseService: BaseService<FeatureVersionScreens>;

	constructor(
		@InjectRepository(FeatureVersionScreens)
		private readonly featureVersionScreensRepository: Repository<FeatureVersionScreens>,
		private readonly featureVersionService: FeatureVersionsService,
		private readonly screenVersionService: ScreenVersionsService,
	) {
		this.baseService = new BaseService<FeatureVersionScreens>(this.featureVersionScreensRepository);
	}

  async create(createFeatureVersionScreenDto: CreateFeatureVersionScreenDto) {
    const {
			featureVersionId,
			screenVersionId,
			environment
		} = createFeatureVersionScreenDto;

		const newFeatureVersionScreen: DeepPartial<FeatureVersionScreens> = {};

		if (!featureVersionId) {
			throw new BadRequestException('Feature Version ID is required');
		}
		const featureVersion = await this.featureVersionService.findOne(featureVersionId);
		if (!featureVersion) {
			throw new NotFoundException('Feature Version not found');
		}
		newFeatureVersionScreen.featureVersion = featureVersion;

		if (!screenVersionId) {
			throw new BadRequestException('Screen Version ID is required');
		}
		const screenVersion = await this.screenVersionService.findOne(screenVersionId);
		if (!screenVersion) {
			throw new NotFoundException('Screen Version not found');
		}
		newFeatureVersionScreen.screenVersion = screenVersion;
		if (!environment) {
			throw new BadRequestException('Environment is required');
		}

		newFeatureVersionScreen.environment = environment;
		const featureVersionScreen = this.featureVersionScreensRepository.create(newFeatureVersionScreen);
		return this.featureVersionScreensRepository.save(featureVersionScreen);
  }

  findAll(query: Partial<CreateFeatureVersionScreenDto>) {
    const buildFilters = (q: Partial<CreateFeatureVersionScreenDto & FindOptionsWhere<FeatureVersionScreens>>) => {
			const filters: FindOptionsWhere<FeatureVersionScreens> = {};
			if (q.id) filters.id = q.id;
			if (q.featureVersionId) filters.featureVersion = { id: q.featureVersionId };
			if (q.screenVersionId) filters.screenVersion = { id: q.screenVersionId };
			if (q.environment) filters.environment = q.environment
			return filters;
		}

		return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
    return this.featureVersionScreensRepository.findOne({
			where: { id }
		});
  }

  async update(id: string, updateFeatureVersionScreenDto: UpdateFeatureVersionScreenDto) {
    const {
			featureVersionId,
			screenVersionId,
			environment
		} = updateFeatureVersionScreenDto;
		const updatedFeatureVersionScreen: DeepPartial<FeatureVersionScreens> = {}

		if (!featureVersionId) {
			throw new BadRequestException('Feature Version ID is required');
		}
		const featureVersion = await this.featureVersionService.findOne(featureVersionId);
		if (!featureVersion) {
			throw new NotFoundException('Feature Version not found');
		}
		updatedFeatureVersionScreen.featureVersion = featureVersion;
		if (!screenVersionId) {
			throw new BadRequestException('Screen Version ID is required');
		}
		const screenVersion = await this.screenVersionService.findOne(screenVersionId);
		if (!screenVersion) {
			throw new NotFoundException('Screen Version not found');
		}
		updatedFeatureVersionScreen.screenVersion = screenVersion;
		if (!environment) {
			throw new BadRequestException('Environment is required');
		}
		updatedFeatureVersionScreen.environment = environment;
		
		const featureVersionScreen = await this.featureVersionScreensRepository.findOne({
			where: { id }
		});
		if (!featureVersionScreen) {
			throw new NotFoundException('Feature Version Screen not found');
		}
		const updatedFeatureVersion = this.featureVersionScreensRepository.merge(featureVersionScreen, updatedFeatureVersionScreen);
		return this.featureVersionScreensRepository.save(updatedFeatureVersion);
  }

  async remove(id: string) {
    const featureVersionScreen = await this.featureVersionScreensRepository.findOne({
			where: { id }
		});
		if (!featureVersionScreen) {
			throw new NotFoundException('Feature Version Screen not found');
		}
		return this.featureVersionScreensRepository.remove(featureVersionScreen);
  }
}
