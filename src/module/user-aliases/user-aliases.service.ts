import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserAliasDto } from './dto/create-user-alias.dto';
import { UpdateUserAliasDto } from './dto/update-user-alias.dto';
import { BaseService } from '../../common/base.service';
import { UserAliases } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { StyleAliasesService } from '../style-aliases/style-aliases.service';

@Injectable()
export class UserAliasesService {
	private baseService: BaseService<UserAliases>;

	constructor(
		@InjectRepository(UserAliases)
		private readonly userAliasesRepository: Repository<UserAliases>,
		private readonly usersService: UsersService,
		private readonly styleAliasesService: StyleAliasesService,
	) {
		this.baseService = new BaseService<UserAliases>(this.userAliasesRepository)
	}

  async create(createUserAliasDto: CreateUserAliasDto) {
		const { aliasId, userId, ...userAliasData } = createUserAliasDto;
	
		if (!aliasId) {
			throw new NotFoundException(`Alias ID is required`);
		}
	
		if (!userId) {
			throw new NotFoundException(`User ID is required`);
		}
	
		const alias = await this.styleAliasesService.findOne(aliasId);
		if (!alias) {
			throw new NotFoundException(`Alias with ID ${aliasId} not found`);
		}
	
		const user = await this.usersService.findOne(userId);
		if (!user) {
			throw new NotFoundException(`User with ID ${userId} not found`);
		}
	
		const newUserAliasData: DeepPartial<UserAliases> = {
			...userAliasData,
			alias,
			user
		};
	
		const userAlias = this.userAliasesRepository.create(newUserAliasData);
		return this.userAliasesRepository.save(userAlias);
	}

  findAll(query: Partial<CreateUserAliasDto>) {
    const buildFilters = (q: Partial<CreateUserAliasDto & FindOptionsWhere<UserAliases>>) => {
			const filters: FindOptionsWhere<UserAliases> = {};
			if (q.id) filters.id = q.id;
			if (q.userId) filters.user = { id: q.userId };
			if (q.aliasId) filters.alias = { id: q.aliasId };
			if (q.shortKey) filters.shortKey = q.shortKey;
			if (q.propertyOverride) filters.propertyOverride = q.propertyOverride;
			return filters;
		}
		return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
    return this.userAliasesRepository.findOne({ where: { id }});
  }

  async update(id: string, updateUserAliasDto: UpdateUserAliasDto) {
		const { aliasId, userId, ...userAliasData } = updateUserAliasDto;
	
		if (!aliasId) {
			throw new NotFoundException(`Alias ID is required`);
		}
	
		if (!userId) {
			throw new NotFoundException(`User ID is required`);
		}
	
		const alias = await this.styleAliasesService.findOne(aliasId);
		if (!alias) {
			throw new NotFoundException(`Alias with ID ${aliasId} not found`);
		}
	
		const user = await this.usersService.findOne(userId);
		if (!user) {
			throw new NotFoundException(`User with ID ${userId} not found`);
		}
	
		const userAlias = await this.userAliasesRepository.findOne({
			where: { id }
		});
		if (!userAlias) {
			throw new NotFoundException(`UserAlias with ID ${id} does not exist.`);
		}
	
		const updateUserAlias: DeepPartial<UserAliases> = {
			...userAliasData,
			alias,
			user
		};
	
		const updatedUserAlias = this.userAliasesRepository.merge(userAlias, updateUserAlias);
		return this.userAliasesRepository.save(updatedUserAlias);
	}

  async remove(id: string) {
		const userAlias = await this.userAliasesRepository.findOne({
			where: { id }
		});
		if (!userAlias) {
			throw new NotFoundException(`UserAlias with ID ${id} does not exist.`);
		}
		return this.userAliasesRepository.remove(userAlias);
  }
}
