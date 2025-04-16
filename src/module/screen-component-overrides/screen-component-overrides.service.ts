import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScreenComponentOverrideDto } from './dto/create-screen-component-override.dto';
import { UpdateScreenComponentOverrideDto } from './dto/update-screen-component-override.dto';
import { BaseService } from '../../common/base.service';
import { ScreenComponentOverrides } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { ScreenComponentsService } from '../screen-components/screen-components.service';

@Injectable()
export class ScreenComponentOverridesService {
	private baseService: BaseService<ScreenComponentOverrides>;

	constructor(
		@InjectRepository(ScreenComponentOverrides)
		private readonly screenComponentOverridesRepository: Repository<ScreenComponentOverrides>,
		private readonly screenComponentsService: ScreenComponentsService,
	) {
		this.baseService = new BaseService<ScreenComponentOverrides>(this.screenComponentOverridesRepository);
	}

  async create(createScreenComponentOverrideDto: CreateScreenComponentOverrideDto) {
    const { screenComponentId, ...data } = createScreenComponentOverrideDto;
		if (!screenComponentId) {
			throw new NotFoundException('Screen Component ID is required');
		}
		const screenComponentOverrideData: DeepPartial<ScreenComponentOverrides> = {
			...data,
		};

		const screenComponent = await this.screenComponentsService.findOne(screenComponentId);
		if (!screenComponent) {
			throw new NotFoundException(`Screen Component with ID ${screenComponentId} does not exist.`);
		}
		screenComponentOverrideData.screenComponent = screenComponent;
		const screenComponentOverride = this.screenComponentOverridesRepository.create(screenComponentOverrideData);
		return this.screenComponentOverridesRepository.save(screenComponentOverride);
  }

  findAll(query: Partial<CreateScreenComponentOverrideDto>) {
		const buildFilters = (q: Partial<CreateScreenComponentOverrideDto & FindOptionsWhere<ScreenComponentOverrides>>) => {
			const filters: FindOptionsWhere<ScreenComponentOverrides> = {};
			if (q.id) filters.id = q.id;
			if (q.screenComponentId) filters.screenComponent = { id: q.screenComponentId };
			if (q.key) filters.key = q.key;
			if (q.value) filters.value = q.value;
			return filters;
		}
			
    return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
    return this.screenComponentOverridesRepository.findOne({
			where: { id },
		});
  }

  async update(id: string, updateScreenComponentOverrideDto: UpdateScreenComponentOverrideDto) {
		const { screenComponentId, ...data } = updateScreenComponentOverrideDto;
		if (!screenComponentId) {
			throw new NotFoundException('Screen Component ID is required');
		}
		const screenComponentOverrideData: DeepPartial<ScreenComponentOverrides> = {
			...data,
		};
		const screenComponent = await this.screenComponentsService.findOne(screenComponentId);
		if (!screenComponent) {
			throw new NotFoundException(`Screen Component with ID ${screenComponentId} does not exist.`);
		}
		screenComponentOverrideData.screenComponent = screenComponent;
		const screenComponentOverride = await this.screenComponentOverridesRepository.findOne({
			where: { id },
		});
		if (!screenComponentOverride) {
			throw new NotFoundException(`Screen Component Override with ID ${id} does not exist.`);
		}
		this.screenComponentOverridesRepository.merge(screenComponentOverride, screenComponentOverrideData);
		return this.screenComponentOverridesRepository.save(screenComponentOverride);
  }

  async remove(id: string) {
		const screenComponentOverride = await this.screenComponentOverridesRepository.findOne({
			where: { id },
		});
		if (!screenComponentOverride) {
			throw new NotFoundException(`Screen Component Override with ID ${id} does not exist.`);
		}
		return this.screenComponentOverridesRepository.remove(screenComponentOverride);
  }
}
