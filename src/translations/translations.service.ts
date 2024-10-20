import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Translation } from '../entities/translation.entity';
import { Language } from '../entities/language.entity';

@Injectable()
export class TranslationsService {
  constructor(
    @InjectRepository(Translation)
    private translationsRepository: Repository<Translation>,
    
    @InjectRepository(Language)
    private languagesRepository: Repository<Language>,
  ) {}

  // Obtener todas las traducciones de un idioma
  getAllTranslations(langId: string) {
    return this.translationsRepository.find({ where: { language: { id: langId } } });
  }

  // Obtener una traducción específica
  getTranslationById(id: string) {
    return this.translationsRepository.findOne({ where: { id }, relations: ['language'] });
  }

  // Crear una nueva traducción
  async createTranslation(langId: string, createTranslationDto: any) {
    const language = await this.languagesRepository.findOne({ where: { id: langId } });
    if (!language) {
      throw new Error('Language not found');
    }
    const newTranslation = this.translationsRepository.create({ ...createTranslationDto, language });
    return this.translationsRepository.save(newTranslation);
  }

  // Actualizar una traducción existente
  async updateTranslation(id: string, updateTranslationDto: any) {
    const translation = await this.translationsRepository.findOne({ where: { id } });
    if (!translation) {
      throw new Error('Translation not found');
    }
    Object.assign(translation, updateTranslationDto);  // Actualizamos los campos
    return this.translationsRepository.save(translation);
  }

  // Eliminar una traducción
  deleteTranslation(id: string) {
    return this.translationsRepository.delete(id);
  }
}
