import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserTokenDto } from './dto/create-user-token.dto';
import { UpdateUserTokenDto } from './dto/update-user-token.dto';
import { BaseService } from '../../common/base.service';
import { UserTokens } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { TokenDefinitionsService } from '../token-definitions/token-definitions.service';
import { TokenCategoriesService } from '../token-categories/token-categories.service';

@Injectable()
export class UserTokensService {
	private baseService: BaseService<UserTokens>;

	constructor(
		@InjectRepository(UserTokens)
		private readonly userTokensRepository: Repository<UserTokens>,
		private readonly usersService: UsersService,
		private readonly tokenDefinitionsService: TokenDefinitionsService,
		private readonly tokenCategoriesService: TokenCategoriesService,
	) {}

  async create(createUserTokenDto: CreateUserTokenDto) {
    const {baseTokenId,categoryId,updatedBy,userId, ...createData} = createUserTokenDto;
		const newUserToken: DeepPartial<UserTokens> = {
			...createData,
		}
		if(!baseTokenId) {
			throw new NotFoundException(`BaseToken with ID ${baseTokenId} does not exist.`);
		}
		const baseToken = await this.tokenDefinitionsService.findOne(baseTokenId);
		if(!baseToken) {
			throw new NotFoundException(`BaseToken with ID ${baseTokenId} does not exist.`);
		}
		newUserToken.baseToken = baseToken;
		if(!categoryId) {
			throw new NotFoundException(`Category with ID ${categoryId} does not exist.`);
		}
		const category = await this.tokenCategoriesService.findOne(categoryId);
		if(!category) {
			throw new NotFoundException(`Category with ID ${categoryId} does not exist.`);
		}
		newUserToken.category = category;
		if(!userId) {
			throw new NotFoundException(`User with ID ${userId} does not exist.`);
		}
		const user = await this.usersService.findOne(userId);
		if(!user) {
			throw new NotFoundException(`User with ID ${userId} does not exist.`);
		}
		newUserToken.user = user;

		if(!updatedBy) {
			newUserToken.updatedBy = user;
		}
		else {
			const updatedByUser = await this.usersService.findOne(updatedBy);
			if(!updatedByUser) {
				throw new NotFoundException(`User with ID ${updatedBy} does not exist.`);
			}
			newUserToken.updatedBy = updatedByUser;
		}
		
		const userToken = this.userTokensRepository.create(newUserToken);
		return this.userTokensRepository.save(userToken);
  }

  findAll(query: Partial<CreateUserTokenDto>) {
    const buildFilters = (q: Partial<CreateUserTokenDto & FindOptionsWhere<UserTokens>>) => {
			const filters: FindOptionsWhere<UserTokens> = {};
			if (q.id) filters.id = q.id;
			if (q.userId) filters.user = {id: q.userId};
			if (q.categoryId) filters.category = {id: q.categoryId};
			if (q.baseTokenId) filters.baseToken = {id: q.baseTokenId};
			if (q.tokenKey) filters.tokenKey = q.tokenKey;
			if (q.tokenValue) filters.tokenValue = q.tokenValue;
			if (q.updatedBy) filters.updatedBy = {id: q.updatedBy};
			if (q.createdAt) filters.createdAt = q.createdAt;
			return filters;
		}

		return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
    return this.userTokensRepository.findOne({ where: { id } });
  }

  async update(id: string, updateUserTokenDto: UpdateUserTokenDto) {
  	const {baseTokenId,categoryId,updatedBy,userId, ...updateData} = updateUserTokenDto;
		const updateUserToken: DeepPartial<UserTokens> = {
			...updateData
		}

		if(!userId) {
			throw new NotFoundException(`User is a required field.`);
		}
		const user = await this.usersService.findOne(userId);
		if(!user) {
			throw new NotFoundException(`User with ID ${userId} does not exist.`);
		}
		updateUserToken.user = user;

		if(!baseTokenId) {
			throw new NotFoundException(`BaseToken is a required field.`);
		}
		const baseToken = await this.tokenDefinitionsService.findOne(baseTokenId);
		if(!baseToken) {
			throw new NotFoundException(`BaseToken with ID ${baseTokenId} does not exist.`);
		}
		updateUserToken.baseToken = baseToken;

		if(!categoryId) {
			throw new NotFoundException(`Category is a required field.`);
		}
		const category = await this.tokenCategoriesService.findOne(categoryId);
		if(!category) {
			throw new NotFoundException(`Category with ID ${categoryId} does not exist.`);
		}
		updateUserToken.category = category;

		if(!updatedBy) {
			updateUserToken.updatedBy = user;
		}
		else {
			const updatedByUser = await this.usersService.findOne(updatedBy);
			if(!updatedByUser) {
				throw new NotFoundException(`User with ID ${updatedBy} does not exist.`);
			}
			updateUserToken.updatedBy = updatedByUser;
		}
		const userToken = await this.userTokensRepository.findOne({ where: { id } });
		if (!userToken) {
			throw new NotFoundException(`UserToken with ID ${id} does not exist.`);
		}
		const updatedUserToken = this.userTokensRepository.merge(userToken, updateUserToken);
		return this.userTokensRepository.save(updatedUserToken);
  }

  async remove(id: string) {
    return this.userTokensRepository.delete(id);
  }
}
