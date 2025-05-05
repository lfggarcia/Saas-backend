import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';
import { Apps, Users } from '../../entities';
import { BaseService } from '../../common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class AppsService {

	private baseService: BaseService<Apps>;

	constructor(
		@InjectRepository(Apps)
		private readonly appsRepository: Repository<Apps>,
		private readonly usersService: UsersService,
	) {
		this.baseService = new BaseService(this.appsRepository);
	}

  async create(createAppDto: CreateAppDto) {
		const { userId, ...appData } = createAppDto;
		if (!userId) {
			throw new NotFoundException('User ID is required');
		}
		const user = await this.usersService.findOne(userId, true);
		if (!(user instanceof Users)) {
			throw new NotFoundException(`User with ID ${userId} does not exist or is not a valid user.`);
		}
		if (!user) {
			throw new NotFoundException(`User with ID ${userId} does not exist.`);
		}
		const app = this.appsRepository.create(appData);
		app.user = user;
		return this.appsRepository.save(app);
  }

  findAll(query: Partial<CreateAppDto>) {
    const buildFilters = (q: Partial<CreateAppDto & FindOptionsWhere<Apps>>) => {
			const filters: FindOptionsWhere<Apps> = {};
			if (q.id) filters.id = q.id;
			if (q.name) filters.name = q.name;
			if (q.description) filters.description = q.description;
			if (q.userId) filters.user = { id: q.userId };
			return filters;
		};
		return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
    return this.appsRepository.findOne({ where: { id }});
  }

  async update(id: string, updateAppDto: UpdateAppDto) {
    const app = await this.appsRepository.findOne({
			where: { id }
		});
		if (!app) {
			throw new NotFoundException(`App with ID ${id} does not exist.`);
		}

		if (!updateAppDto.userId) {
			throw new NotFoundException('User ID is required');
		}
		if (updateAppDto.userId !== app.user.id) {
			throw new NotFoundException(`User with ID ${updateAppDto.userId} does not own this app.`);
		}
		const updatedApp = this.appsRepository.merge(app, updateAppDto);
		return this.appsRepository.save(updatedApp);
  }

  async remove(id: string) {
    const app = await this.appsRepository.findOne({
			where: { id }
		});
		if (!app) {
			throw new NotFoundException(`App with ID ${id} does not exist.`);
		}
		return this.appsRepository.remove(app);
  }
}
