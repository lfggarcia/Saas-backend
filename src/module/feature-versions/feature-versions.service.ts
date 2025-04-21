import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeatureVersionDto } from './dto/create-feature-version.dto';
import { UpdateFeatureVersionDto } from './dto/update-feature-version.dto';
import { BaseService } from '../../common/base.service';
import { FeatureVersions } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { FeaturesService } from '../features/features.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class FeatureVersionsService {
	private baseService: BaseService<FeatureVersions>;

	constructor(
		@InjectRepository(FeatureVersions)
		private readonly featureVersionsRepository: Repository<FeatureVersions>,
		private readonly featuresService: FeaturesService,
		private readonly usersService: UsersService,
	) {
		this.baseService = new BaseService<FeatureVersions>(this.featureVersionsRepository);
	}

  async create(createFeatureVersionDto: CreateFeatureVersionDto) {
    const { 
			createdBy,
			featureId,
			updatedBy,
			...data
		} = createFeatureVersionDto;

			const newFeatureVersion: DeepPartial<FeatureVersions> = {
				...data
		 	}

			if (!featureId) {
				throw new BadRequestException('Feature ID is required');
		 	}

			const feature = await this.featuresService.findOne(featureId);
			if (!feature) {
				throw new NotFoundException('Feature not found');
		 	}
			newFeatureVersion.feature = feature;
			if (!createdBy) {
				throw new BadRequestException('Created By is required');
		 	}
			const user = await this.usersService.findOne(createdBy);
			if (!user) {
				throw new NotFoundException('User not found');
		 	}
			newFeatureVersion.createdBy = user;
			if (!updatedBy) {
				newFeatureVersion.updatedBy = user;
		 	} else {
				const updatedUser = await this.usersService.findOne(updatedBy);
				if (!updatedUser) {
					throw new NotFoundException('User not found');
			 	}
				newFeatureVersion.updatedBy = updatedUser;
			}
			const featureVersion = this.featureVersionsRepository.create(newFeatureVersion);
			return this.featureVersionsRepository.save(featureVersion);
  }

  findAll(query: Partial<CreateFeatureVersionDto>) {
		const buildFilters = (q: Partial<CreateFeatureVersionDto & FindOptionsWhere<FeatureVersions>>) => {
			const filters: FindOptionsWhere<FeatureVersions> = {};
			if (q.id) filters.id = q.id;
			if (q.featureId) filters.featureId = q.featureId;
			if (q.createdBy) filters.createdBy = q.createdBy;
			if (q.updatedBy) filters.updatedBy = q.updatedBy;
			if (q.createdAt) filters.createdAt = q.createdAt;
			if ("isPublished" in q) filters.isPublished = q.isPublished;
			if (q.version) filters.version = q.version;
			return filters;
		}

		return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
    return this.featureVersionsRepository.findOne({ where: { id } });
  }

  async update(id: string, updateFeatureVersionDto: UpdateFeatureVersionDto) {
    const {
			createdBy,
			featureId,
			updatedBy,
			...data
		} = updateFeatureVersionDto;

		const updatedFeatureVersion: DeepPartial<FeatureVersions> = {
			...data
		}

		if (!featureId) {
			throw new BadRequestException('Feature ID is required');
		}
		const feature = await this.featuresService.findOne(featureId);
		if (!feature) {
			throw new NotFoundException('Feature not found');
		}
		updatedFeatureVersion.feature = feature;
		if (!createdBy) {
			throw new BadRequestException('Created By is required');
		}
		const user = await this.usersService.findOne(createdBy);
		if (!user) {
			throw new NotFoundException('User not found');
		}
		updatedFeatureVersion.createdBy = user;
		if (!updatedBy) {
			updatedFeatureVersion.updatedBy = user;
		}
		else {
			const updatedUser = await this.usersService.findOne(updatedBy);
			if (!updatedUser) {
				throw new NotFoundException('User not found');
			}
			updatedFeatureVersion.updatedBy = updatedUser;
		}
		const featureVersion = await this.featureVersionsRepository.findOne({
			where: { id }
		});
		if (!featureVersion) {
			throw new NotFoundException(`FeatureVersion with ID ${id} does not exist.`);
		}
		const updatedFeatureVersionData = this.featureVersionsRepository.merge(featureVersion, updatedFeatureVersion);
		return this.featureVersionsRepository.save(updatedFeatureVersionData);
  }

  async remove(id: string) {
    const featureVersion = await this.featureVersionsRepository.findOne({
			where: { id }
		});
		if (!featureVersion) {
			throw new NotFoundException(`FeatureVersion with ID ${id} does not exist.`);
		}
		return this.featureVersionsRepository.remove(featureVersion);
  }
}
