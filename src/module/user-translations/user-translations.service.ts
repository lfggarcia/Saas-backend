import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserTranslationDto } from './dto/create-user-translation.dto';
import { UpdateUserTranslationDto } from './dto/update-user-translation.dto';
import { BaseService } from '../../common/base.service';
import { UserTranslations } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { TranslationKeysService } from '../translation-keys/translation-keys.service';
import { UserLanguagesService } from '../user-languages/user-languages.service';

@Injectable()
export class UserTranslationsService {
	private baseService: BaseService<UserTranslations>;

	constructor(
		@InjectRepository(UserTranslations)
		private readonly userTranslationsRepository: Repository<UserTranslations>,
		private readonly translationKeysService: TranslationKeysService,
		private readonly userLanguagesService: UserLanguagesService,
	) {
		this.baseService = new BaseService(this.userTranslationsRepository);
	}

  async create(createUserTranslationDto: CreateUserTranslationDto) {
    const {keyId,languageId, ...data} = createUserTranslationDto;
		const createUserTranslationData: DeepPartial<UserTranslations> = {
			...data
		}

		if (!keyId) {
			throw new NotFoundException(`TranslationKey with ID ${keyId} does not exist.`);
		}

		const translationKey = await this.translationKeysService.findOne(keyId);
		if (!translationKey) {
			throw new NotFoundException(`TranslationKey with ID ${keyId} does not exist.`);
		}
		createUserTranslationData.key = translationKey;
		if (!languageId) {
			throw new NotFoundException(`UserLanguage with ID ${languageId} does not exist.`);
		}
		const userLanguage = await this.userLanguagesService.findOne(languageId);
		if (!userLanguage) {
			throw new NotFoundException(`UserLanguage with ID ${languageId} does not exist.`);
		}
		createUserTranslationData.language = userLanguage;
		const userTranslation = this.userTranslationsRepository.create(createUserTranslationData);
		return this.userTranslationsRepository.save(userTranslation);
  }

  findAll(query: Partial<CreateUserTranslationDto>) {
    const buildFilters = (q: Partial<CreateUserTranslationDto & FindOptionsWhere<UserTranslations>>) => {
			const filters: FindOptionsWhere<UserTranslations> = {};
			if (q.id) filters.id = q.id;
			if (q.keyId) filters.key = { id: q.keyId };
			if (q.languageId) filters.language = { id: q.languageId };
			if (q.translation) filters.translation = q.translation;
			if (q.lastUpdatedAt) filters.lastUpdatedAt = q.lastUpdatedAt;
			return filters;
		}

		return this.baseService.findAll(query, buildFilters);
  }

  async findOne(id: string) {
		const userTranslation = await this.userTranslationsRepository.findOne({
			where: { id },
			relations: ['key', 'language'],
		});
		if (!userTranslation) {
			throw new NotFoundException(`UserTranslation with ID ${id} does not exist.`);
		}
		return userTranslation;
  }

  async update(id: string, updateUserTranslationDto: UpdateUserTranslationDto) {
		const {keyId,languageId, ...data} = updateUserTranslationDto;
		const updateUserTranslationData: DeepPartial<UserTranslations> = {
			...data
		}

		if (!keyId) {
			throw new NotFoundException(`TranslationKey with ID ${keyId} does not exist.`);
		}
		const translationKey = await this.translationKeysService.findOne(keyId);
		if (!translationKey) {
			throw new NotFoundException(`TranslationKey with ID ${keyId} does not exist.`);
		}
		updateUserTranslationData.key = translationKey;
		if (!languageId) {
			throw new NotFoundException(`UserLanguage with ID ${languageId} does not exist.`);
		}
		const userLanguage = await this.userLanguagesService.findOne(languageId);
		if (!userLanguage) {
			throw new NotFoundException(`UserLanguage with ID ${languageId} does not exist.`);
		}
		updateUserTranslationData.language = userLanguage;

		const userTranslation = await this.userTranslationsRepository.findOne({ where: { id } });
		if (!userTranslation) {
			throw new NotFoundException(`UserTranslation with ID ${id} does not exist.`);
		}
		this.userTranslationsRepository.merge(userTranslation, updateUserTranslationData);
		return this.userTranslationsRepository.save(userTranslation);
  }

  async remove(id: string) {
		const userTranslation = await this.userTranslationsRepository.findOne({ where: { id } });
		if (!userTranslation) {
			throw new NotFoundException(`UserTranslation with ID ${id} does not exist.`);
		}
		return this.userTranslationsRepository.remove(userTranslation);
  }
}
