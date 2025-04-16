import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { CreateTranslationKeyDto } from './dto/create-translation-key.dto';
import { UpdateTranslationKeyDto } from './dto/update-translation-key.dto';
import { BaseService } from '../../common/base.service';
import { TranslationKeys } from '../../entities';
import { UsersService } from '../users/users.service';

@Injectable()
export class TranslationKeysService {
	private baseService: BaseService<TranslationKeys>;

	constructor(
		@InjectRepository(TranslationKeys)
		private readonly translationKeysRepository: Repository<TranslationKeys>,
		private readonly usersService: UsersService
	) {
		this.baseService = new BaseService(this.translationKeysRepository);
	}

  async create(createTranslationKeyDto: CreateTranslationKeyDto) {
    const {userId,...data} = createTranslationKeyDto;
		const createTranslationKeyData:DeepPartial<TranslationKeys> = {
			...data,
		}

		if (!userId) {
			throw new NotFoundException(`User with ID ${userId} does not exist.`);
		}

		const user = await this.usersService.findOne(userId);
		if (!user) {
			throw new NotFoundException(`User with ID ${userId} does not exist.`);
		}
		createTranslationKeyData.user = user;
		const translationKey = this.translationKeysRepository.create(createTranslationKeyData);
		return this.translationKeysRepository.save(translationKey);
  }

  findAll(query: Partial<CreateTranslationKeyDto>) {
		const buildFilters = (q: Partial<CreateTranslationKeyDto & FindOptionsWhere<TranslationKeys>>) => {
			const filters: FindOptionsWhere<TranslationKeys> = {};
			if (q.id) filters.id = q.id;
			if (q.userId) filters.user = { id: q.userId };
			if (q.namespace) filters.namespace = q.namespace;
			if (q.key) filters.key = q.key;
			if (q.description) filters.description = q.description;
			return filters;
		}
    
		return this.baseService.findAll(query, buildFilters);
  }

  findOne(id: string) {
    return this.translationKeysRepository.findOne({ where: { id } });
  }

  async update(id: string, updateTranslationKeyDto: UpdateTranslationKeyDto) {
    const {userId,...data} = updateTranslationKeyDto;
		const translationKey = await this.translationKeysRepository.findOne({
			where: { id },
		});
		if (!translationKey) {
			throw new NotFoundException(`TranslationKey with ID ${id} does not exist.`);
		}
		const updateTranslationKeyData: DeepPartial<TranslationKeys> = {
			...data,
		}
		if (!userId) {
			throw new NotFoundException(`User with ID ${userId} does not exist.`);
		}

		const user = await this.usersService.findOne(userId);
		if (!user) {
			throw new NotFoundException(`User with ID ${userId} does not exist.`);
		}
		updateTranslationKeyData.user = user;
		const updatedTranslationKey = this.translationKeysRepository.merge(translationKey, updateTranslationKeyData);
		return this.translationKeysRepository.save(updatedTranslationKey);
  }

  async remove(id: string) {
    const translationKey = await this.translationKeysRepository.findOne({
			where: { id },
		});
		if (!translationKey) {
			throw new NotFoundException(`TranslationKey with ID ${id} does not exist.`);
		}
		return this.translationKeysRepository.remove(translationKey);
  }
}
