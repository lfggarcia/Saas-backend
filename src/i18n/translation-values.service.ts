import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TranslationValue } from './entities/translation-value.entity';
import { CreateTranslationValueDto } from './dto/create-translation-value.dto';
import { UpdateTranslationValueDto } from './dto/update-translation-value.dto';

@Injectable()
export class TranslationValuesService {
  constructor(
    @InjectRepository(TranslationValue)
    private translationValuesRepository: Repository<TranslationValue>,
  ) {}

  async create(createTranslationValueDto: CreateTranslationValueDto, userId: string): Promise<TranslationValue> {
    const {translationKey} = await this.translationValuesRepository.findOne({
			where: {
				translationKey: {
					id: createTranslationValueDto.translation_key_id
				},
			},
			relations: ['translationKey', 'translationKey.application', 'translationKey.application.user'],
		});

    if (!translationKey) {
      throw new NotFoundException('Clave de traducción no encontrada');
    }

    if (translationKey.application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para agregar traducciones a esta clave');
    }

    const {language} = await this.translationValuesRepository.findOne({
			where: {
				language: {
					id: createTranslationValueDto.language_id
				}
			},
			relations: ['language', 'language.application', 'language.application.user'],
		})

    if (!language) {
      throw new NotFoundException('Idioma no encontrado');
    }

    if (language.application.id !== translationKey.application.id) {
      throw new ForbiddenException('El idioma no pertenece a la misma aplicación que la clave de traducción');
    }

    const translationValue = this.translationValuesRepository.create({
      ...createTranslationValueDto,
      translationKey: { id: createTranslationValueDto.translation_key_id },
      language: { id: createTranslationValueDto.language_id },
    });

    return this.translationValuesRepository.save(translationValue);
  }

  async findAllByTranslationKey(translationKeyId: string, userId: string): Promise<TranslationValue[]> {
    const {translationKey} = await this.translationValuesRepository.findOne({
			where: { 
				translationKey: { id: translationKeyId }
			},
			relations: ['translationKey', 'translationKey.application', 'translationKey.application.user'],
		})

    if (!translationKey) {
      throw new NotFoundException('Clave de traducción no encontrada');
    }

    if (translationKey.application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a estas traducciones');
    }

    return this.translationValuesRepository.find({
      where: { translationKey: { id: translationKeyId } },
      relations: ['language'],
    });
  }

  async findOne(id: string, userId: string): Promise<TranslationValue> {
    const translationValue = await this.translationValuesRepository.findOne({
      where: { id },
      relations: ['translationKey', 'translationKey.application', 'translationKey.application.user', 'language'],
    });

    if (!translationValue) {
      throw new NotFoundException('Valor de traducción no encontrado');
    }

    if (translationValue.translationKey.application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a esta traducción');
    }

    return translationValue;
  }

  async update(id: string, updateTranslationValueDto: UpdateTranslationValueDto, userId: string): Promise<TranslationValue> {
    const translationValue = await this.findOne(id, userId);

    await this.translationValuesRepository.update(id, updateTranslationValueDto);

    return this.translationValuesRepository.findOne({
			where: { id },
			relations: ['language']
		});
  }

  async remove(id: string, userId: string): Promise<void> {
    const translationValue = await this.findOne(id, userId);

    await this.translationValuesRepository.delete(id);
  }
}
