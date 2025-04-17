import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserThemeDto } from './dto/create-user-theme.dto';
import { UpdateUserThemeDto } from './dto/update-user-theme.dto';
import { UserThemes } from '../../entities';
import { BaseService } from '../../common/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class UserThemesService {
	private baseService: BaseService<UserThemes>;

	constructor(
		@InjectRepository(UserThemes)
		private readonly userThemesRepository: Repository<UserThemes>,
		private readonly usersService: UsersService,
	) {
		this.baseService = new BaseService(this.userThemesRepository);
	}

  async create(createUserThemeDto: CreateUserThemeDto) {
    const {userId, updatedBy, ...data} = createUserThemeDto;
		const createUserThemeData: DeepPartial<UserThemes> = {
			...data,
		};
		if (!userId) {
			throw new NotFoundException(`User with ID ${userId} does not exist.`);
		}
		const user = await this.usersService.findOne(userId);
		if (!user) {
			throw new NotFoundException(`User with ID ${userId} does not exist.`);
		}
		if (!updatedBy) {
			createUserThemeData.updatedBy = user;
		} else {
			const updatedByUser = await this.usersService.findOne(updatedBy);
			if (!updatedByUser) {
				throw new NotFoundException(`User with ID ${updatedBy} does not exist.`);
			}
			createUserThemeData.updatedBy = updatedByUser;
		}
		createUserThemeData.user = user;
		const userTheme = this.userThemesRepository.create(createUserThemeData);
		return this.userThemesRepository.save(userTheme);
  }

  findAll(query: Partial<CreateUserThemeDto>) {
    const buildFilters = (q: Partial<CreateUserThemeDto & FindOptionsWhere<UserThemes>>) => {
			const filters: FindOptionsWhere<UserThemes> = {};
			if (q.id) filters.id = q.id;
			if (q.name) filters.name = q.name;
			if (q.createdAt) filters.createdAt = q.createdAt;
			if (q.updatedAt) filters.updatedAt = q.updatedAt;
			if (q.updatedBy) filters.updatedBy = { id: q.updatedBy };
			if (q.userId) filters.user = { id: q.userId };
			return filters;
		}

		return this.baseService.findAll(query, buildFilters);
  }

  async findOne(id: string) {
		const userTheme = await this.userThemesRepository.findOne({
			where: { id },
			relations: ['user', 'updatedBy'],
		});
		if (!userTheme) {
			throw new NotFoundException(`UserTheme with ID ${id} does not exist.`);
		}
		return userTheme;
  }

  async update(id: string, updateUserThemeDto: UpdateUserThemeDto) {
    const {userId, updatedBy, ...data} = updateUserThemeDto;
		const updateUserThemeData: DeepPartial<UserThemes> = {
			...data
		}
		if (!userId) {
			throw new NotFoundException(`User with ID ${userId} does not exist.`);
		}
		const user = await this.usersService.findOne(userId);
		if (!user) {
			throw new NotFoundException(`User with ID ${userId} does not exist.`);
		}
		updateUserThemeData.user = user;
		if (!updatedBy) {
			throw new NotFoundException(`User with ID ${updatedBy} does not exist.`);
		}
		const updatedByUser = await this.usersService.findOne(updatedBy);
		if (!updatedByUser) {
			throw new NotFoundException(`User with ID ${updatedBy} does not exist.`);
		}
		updateUserThemeData.updatedBy = updatedByUser;
		const userTheme = await this.userThemesRepository.findOne({ where: { id } });
		if (!userTheme) {
			throw new NotFoundException(`UserTheme with ID ${id} does not exist.`);
		}
		this.userThemesRepository.merge(userTheme, updateUserThemeData);
		return this.userThemesRepository.save(userTheme);
  }

  async remove(id: string) {
		const userTheme = await this.userThemesRepository.findOne({ where: { id } });
		if (!userTheme) {
			throw new NotFoundException(`UserTheme with ID ${id} does not exist.`);
		}
		await this.userThemesRepository.remove(userTheme);
		return userTheme;
  }
}
