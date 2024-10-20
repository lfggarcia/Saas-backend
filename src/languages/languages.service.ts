import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from '../entities/language.entity';
import { Application } from '../entities/application.entity';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private languagesRepository: Repository<Language>,
    
    @InjectRepository(Application)
    private appsRepository: Repository<Application>,
  ) {}

  // Obtener todos los idiomas de una aplicación
  getAllLanguages(appId: string) {
    return this.languagesRepository.find({ where: { application: { id: appId } } });
  }

  // Obtener un idioma específico
  getLanguageById(id: string) {
    return this.languagesRepository.findOne({ where: { id }, relations: ['application'] });
  }

  // Crear un nuevo idioma
  async createLanguage(appId: string, createLanguageDto: any) {
    const app = await this.appsRepository.findOne({ where: { id: appId } });
    if (!app) {
      throw new Error('Application not found');
    }
    const newLanguage = this.languagesRepository.create({ ...createLanguageDto, application: app });
    return this.languagesRepository.save(newLanguage);
  }

  // Actualizar un idioma existente
  async updateLanguage(id: string, updateLanguageDto: any) {
    const language = await this.languagesRepository.findOne({ where: { id } });
    if (!language) {
      throw new Error('Language not found');
    }
    Object.assign(language, updateLanguageDto);  // Actualizamos los campos
    return this.languagesRepository.save(language);
  }

  // Eliminar un idioma
  deleteLanguage(id: string) {
    return this.languagesRepository.delete(id);
  }
}
