import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScreenVersionDto } from './dto/create-screen-version.dto';
import { UpdateScreenVersionDto } from './dto/update-screen-version.dto';
import { BaseService } from '../../common/base.service';
import { ScreenVersions } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { ScreensService } from '../screens/screens.service';

@Injectable()
export class ScreenVersionsService {
	private baseService: BaseService<ScreenVersions>;

	constructor(
		@InjectRepository(ScreenVersions)
		private readonly screenVersionsRepository: Repository<ScreenVersions>,
		private readonly usersService: UsersService,
		private readonly screensService: ScreensService,
	) {
		this.baseService = new BaseService(this.screenVersionsRepository);
	}
	

  async create(createScreenVersionDto: CreateScreenVersionDto) {
    const {createdBy, screenId,...data} = createScreenVersionDto;
		const createScreenVersionData: DeepPartial<ScreenVersions> = {
			...data
		}
		if (!createdBy) {
			throw new NotFoundException(`User with ID ${createdBy} does not exist.`);
		}

		const user = await this.usersService.findOne(createdBy);
		if (!user) {
			throw new NotFoundException(`User with ID ${createdBy} does not exist.`);
		}
		createScreenVersionData.createdBy = user;
		if (!screenId) {
			throw new NotFoundException(`Screen with ID ${screenId} does not exist.`);
		}
		const screen = await this.screensService.findOne(screenId);
		if (!screen) {
			throw new NotFoundException(`Screen with ID ${screenId} does not exist.`);
		}
		createScreenVersionData.screen = screen;
		const screenVersion = this.screenVersionsRepository.create(createScreenVersionData);
		return this.screenVersionsRepository.save(screenVersion);
  }

  findAll(query: Partial<CreateScreenVersionDto>) {
    const buildFilters = (q: Partial<CreateScreenVersionDto & FindOptionsWhere<ScreenVersions>>) => {
			const filters: FindOptionsWhere<ScreenVersions> = {};
			if (q.id) filters.id = q.id;
			if (q.version) filters.version = q.version;
			if (q.createdBy) filters.createdBy = { id: q.createdBy };
			if (q.screenId) filters.screen = { id: q.screenId };
			if (q.createdAt) filters.createdAt = q.createdAt;
			if ("isPublished" in q) filters.isPublished = q.isPublished;
			return filters;
		}

		return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
    return this.screenVersionsRepository.findOne({ where: { id } });
  }

  async update(id: string, updateScreenVersionDto: UpdateScreenVersionDto) {
		const {createdBy, screenId,...data} = updateScreenVersionDto;
		const updateScreenVersionData: DeepPartial<ScreenVersions> = {
			...data
		}

		if (!createdBy) {
			throw new NotFoundException(`User with ID ${createdBy} does not exist.`);
		}
		const user = await this.usersService.findOne(createdBy);
		if (!user) {
			throw new NotFoundException(`User with ID ${createdBy} does not exist.`);
		}
		updateScreenVersionData.createdBy = user;
		if (!screenId) {
			throw new NotFoundException(`Screen with ID ${screenId} does not exist.`);
		}
		const screen = await this.screensService.findOne(screenId);
		if (!screen) {
			throw new NotFoundException(`Screen with ID ${screenId} does not exist.`);
		}
		updateScreenVersionData.screen = screen;
		const screenVersion = await this.screenVersionsRepository.findOne({
			where: { id },
		});
		if (!screenVersion) {
			throw new NotFoundException(`ScreenVersion with ID ${id} does not exist.`);
		}
		const updatedScreenVersion = this.screenVersionsRepository.merge(
			screenVersion,
			updateScreenVersionData,
		);
		return this.screenVersionsRepository.save(updatedScreenVersion);
  }

  async remove(id: string) {
		const screenVersion = await this.screenVersionsRepository.findOne({
			where: { id },
		});
		if (!screenVersion) {
			throw new NotFoundException(`ScreenVersion with ID ${id} does not exist.`);
		}
		return this.screenVersionsRepository.remove(screenVersion);
  }
}
