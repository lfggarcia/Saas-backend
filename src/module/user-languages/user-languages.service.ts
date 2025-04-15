import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserLanguageDto } from './dto/create-user-language.dto';
import { UpdateUserLanguageDto } from './dto/update-user-language.dto';
import { UserLanguages } from '../../entities';
import { BaseService } from '../../common/base.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserLanguagesService {
	private baseService: BaseService<UserLanguages>;

	constructor(
		@InjectRepository(UserLanguages)
		private readonly userLanguagesRepository: Repository<UserLanguages>,
		private readonly usersService: UsersService
	) {
		this.baseService = new BaseService(this.userLanguagesRepository);
	}

  create(createUserLanguageDto: CreateUserLanguageDto) {
		const {userId,...data} = createUserLanguageDto;
		const user = this.usersService.findOne(userId);
		if (!user) {
			throw new NotFoundException(`User with ID ${userId} does not exist.`);
		}
		const userLanguage = this.userLanguagesRepository.create({
			...data,
			user: {
				id: userId
			}
		});
		return this.userLanguagesRepository.save(userLanguage);
  }

  findAll(query: Partial<CreateUserLanguageDto>) {
		const buildFilters = (q: any) => {
			const filters: FindOptionsWhere<UserLanguages> = {};
			if (q.id) filters.id = q.id;
			if (q.userId) filters.user = q.userId;
			if (q.displayName) filters.displayName = q.displayName;
			if (q.isDefault) filters.isDefault = q.isDefault;
			if (q.localeCode) filters.localeCode = q.localeCode;

			return filters;
		}

		return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
    return this.userLanguagesRepository.findOne({ where: { id } });
  }

  async update(id: string, updateUserLanguageDto: UpdateUserLanguageDto) {
		const userLanguage = await this.userLanguagesRepository.findOne({
			where: { id }
		});
		if (!userLanguage) {
			throw new NotFoundException(`UserLanguage with ID ${id} does not exist.`);
		}
		const {userId,...data} = updateUserLanguageDto;
		const user = await this.usersService.findOne(userId);
		if (!user) {
			throw new NotFoundException(`User with ID ${userId} does not exist.`);
		}
		const userLanguageUpdate = this.userLanguagesRepository.merge(userLanguage, {
			...data,
			user: {
				id: userId
			}
		});
		return this.userLanguagesRepository.save(userLanguageUpdate);
  }

  async remove(id: string) {
		const userLanguage = await this.userLanguagesRepository.findOne({
			where: { id }
		});
		if (!userLanguage) {
			throw new NotFoundException(`UserLanguage with ID ${id} does not exist.`);
		}
		return this.userLanguagesRepository.remove(userLanguage);
  }
}
