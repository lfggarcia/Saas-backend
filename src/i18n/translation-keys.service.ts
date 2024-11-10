import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TranslationKey } from './entities/translation-key.entity';
import { CreateTranslationKeyDto } from './dto/create-translation-key.dto';
import { UpdateTranslationKeyDto } from './dto/update-translation-key.dto';

@Injectable()
export class TranslationKeysService {
  constructor(
    @InjectRepository(TranslationKey)
    private translationKeysRepository: Repository<TranslationKey>,
  ) {}

  async create(createTranslationKeyDto: CreateTranslationKeyDto, userId: string): Promise<TranslationKey> {
    const {application} = await this.translationKeysRepository.findOne({
			where: {
				application: { id: createTranslationKeyDto.application_id }
			},
			relations: ['application.user'],
		});

    if (!application) {
      throw new NotFoundException('Aplicación no encontrada');
    }

    if (application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para agregar claves de traducción a esta aplicación');
    }

    const translationKey = this.translationKeysRepository.create({
      ...createTranslationKeyDto,
      application: { id: createTranslationKeyDto.application_id },
    });

    return this.translationKeysRepository.save(translationKey);
  }

  async findAllByApplication(applicationId: string, userId: string): Promise<TranslationKey[]> {
    const {application} = await this.translationKeysRepository.findOne({
			where: { application: { id: applicationId } },
			relations: ['application.user'],
		})

    if (!application) {
      throw new NotFoundException('Aplicación no encontrada');
    }

    if (application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a las claves de esta aplicación');
    }

    return this.translationKeysRepository.find({
      where: { application: { id: applicationId } },
    });
  }

  async findOne(id: string, userId: string): Promise<TranslationKey> {
    const translationKey = await this.translationKeysRepository.findOne({
      where: { id },
      relations: ['application', 'application.user'],
    });

    if (!translationKey) {
      throw new NotFoundException('Clave de traducción no encontrada');
    }

    if (translationKey.application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a esta clave de traducción');
    }

    return translationKey;
  }

  async update(id: string, updateTranslationKeyDto: UpdateTranslationKeyDto, userId: string): Promise<TranslationKey> {
    const translationKey = await this.findOne(id, userId);

    await this.translationKeysRepository.update(id, updateTranslationKeyDto);

    return this.translationKeysRepository.findOne({
			where: { id }
		});
  }

  async remove(id: string, userId: string): Promise<void> {
    const translationKey = await this.findOne(id, userId);

    await this.translationKeysRepository.delete(id);
  }
}
