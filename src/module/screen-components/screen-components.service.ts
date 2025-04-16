import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScreenComponentDto } from './dto/create-screen-component.dto';
import { UpdateScreenComponentDto } from './dto/update-screen-component.dto';
import { ScreenComponents } from '../../entities';
import { BaseService } from '../../common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { ComponentPoolService } from '../component-pool/component-pool.service';
import { ScreensService } from '../screens/screens.service';

@Injectable()
export class ScreenComponentsService {
	private baseService: BaseService<ScreenComponents>;

	constructor(
		@InjectRepository(ScreenComponents)
		private readonly screenComponentsRepository: Repository<ScreenComponents>,
		private readonly componentPoolService: ComponentPoolService,
		private readonly screensService: ScreensService,
	) {
		this.baseService = new BaseService<ScreenComponents>(this.screenComponentsRepository)
	}

  async create(createScreenComponentDto: CreateScreenComponentDto) {
    const { componentId,screenId, ...data} = createScreenComponentDto;
		if (!componentId) {
			throw new NotFoundException('Component ID is required');
		}
		if (!screenId) {
			throw new NotFoundException('Screen ID is required');
		}

		const screenComponentData: DeepPartial<ScreenComponents> = {
			...data,
		};

		const component = await this.componentPoolService.findOne(componentId);
		if (!component) {
			throw new NotFoundException(`Component with ID ${componentId} does not exist.`);
		}
		const screen = await this.screensService.findOne(screenId);
		if (!screen) {
			throw new NotFoundException(`Screen with ID ${screenId} does not exist.`);
		}
		screenComponentData.component = component;
		screenComponentData.screen = screen;
		const screenComponent = this.screenComponentsRepository.create(screenComponentData);
		return this.screenComponentsRepository.save(screenComponent);
  }

  findAll(query: Partial<CreateScreenComponentDto>) {
		const buildFilters = (q: Partial<CreateScreenComponentDto & FindOptionsWhere<ScreenComponents>>) => {
			const filters: FindOptionsWhere<ScreenComponents> = {};
			if (q.id) filters.id = q.id;
			if (q.positionIndex) filters.positionIndex = q.positionIndex;
			if (q.componentId) filters.component = { id: q.componentId };
			if (q.screenId) filters.screen = { id: q.screenId };
			return filters;
		}
    
		return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
		return this.screenComponentsRepository.findOne({ where: { id }});
  }

  async update(id: string, updateScreenComponentDto: UpdateScreenComponentDto) {
    const { componentId, screenId, ...data} = updateScreenComponentDto;
		const screenComponent = await this.screenComponentsRepository.findOne({
			where: { id }
		});
		if (!screenComponent) {
			throw new NotFoundException(`Screen Component with ID ${id} does not exist.`);
		}
		if (!componentId) {
			throw new NotFoundException('Component ID is required');
		}
		if (!screenId) {
			throw new NotFoundException('Screen ID is required');
		}
		const component = await this.componentPoolService.findOne(componentId);
		if (!component) {
			throw new NotFoundException(`Component with ID ${componentId} does not exist.`);
		}
		const screen = await this.screensService.findOne(screenId);
		if (!screen) {
			throw new NotFoundException(`Screen with ID ${screenId} does not exist.`);
		}
		const updateScreenComponentData: DeepPartial<ScreenComponents> = {
			...data,
		};
		updateScreenComponentData.component = component;
		updateScreenComponentData.screen = screen;
		const updatedScreenComponent = this.screenComponentsRepository.merge(
			screenComponent,
			updateScreenComponentData
		);
		return this.screenComponentsRepository.save(updatedScreenComponent);
  }

  async remove(id: string) {
    const screenComponent = await this.screenComponentsRepository.findOne({
			where: { id }
		});
		if (!screenComponent) {
			throw new NotFoundException(`Screen Component with ID ${id} does not exist.`);
		}
		return this.screenComponentsRepository.remove(screenComponent);
  }
}
