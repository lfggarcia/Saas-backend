import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Language } from './entities/language.entity';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private languagesRepository: Repository<Language>,
  ) {}

  async create(createLanguageDto: CreateLanguageDto, userId: string): Promise<Language> {
    // Verificar si el usuario es propietario de la aplicación
    const application = await this.languagesRepository.manager.findOne('App', createLanguageDto.application_id, {
      relations: ['user'],
    });

    if (!application) {
      throw new NotFoundException('Aplicación no encontrada');
    }

    if (application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para agregar idiomas a esta aplicación');
    }

    // Si is_default es true, asegurar que no haya otro idioma por defecto
    if (createLanguageDto.is_default) {
      const defaultLanguage = await this.languagesRepository.findOne({
        where: { application: { id: createLanguageDto.application_id }, is_default: true },
      });

      if (defaultLanguage) {
        throw new BadRequestException('Ya existe un idioma por defecto para esta aplicación');
      }
    }

    const language = this.languagesRepository.create({
      ...createLanguageDto,
      application: { id: createLanguageDto.application_id },
    });

    return this.languagesRepository.save(language);
  }

  async findAllByApplication(applicationId: string, userId: string): Promise<Language[]> {
    // Verificar si el usuario es propietario de la aplicación
    const application = await this.languagesRepository.manager.findOne('App', applicationId, {
      relations: ['user'],
    });

    if (!application) {
      throw new NotFoundException('Aplicación no encontrada');
    }

    if (application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a los idiomas de esta aplicación');
    }

    return this.languagesRepository.find({
      where: { application: { id: applicationId } },
    });
  }

  async findOne(id: string, userId: string): Promise<Language> {
    const language = await this.languagesRepository.findOne({
      where: { id },
      relations: ['application', 'application.user'],
    });

    if (!language) {
      throw new NotFoundException('Idioma no encontrado');
    }

    if (language.application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a este idioma');
    }

    return language;
  }

  async update(id: string, updateLanguageDto: UpdateLanguageDto, userId: string): Promise<Language> {
    const language = await this.findOne(id, userId);

    // Si is_default se cambia a true, asegurar que no haya otro idioma por defecto
    if (updateLanguageDto.is_default) {
      const defaultLanguage = await this.languagesRepository.findOne({
        where: { application: { id: language.application.id }, is_default: true },
      });

      if (defaultLanguage && defaultLanguage.id !== id) {
        throw new BadRequestException('Ya existe un idioma por defecto para esta aplicación');
      }
    }

    await this.languagesRepository.update(id, updateLanguageDto);

    return this.languagesRepository.findOne(id);
  }

  async remove(id: string, userId: string): Promise<void> {
    const language = await this.findOne(id, userId);

    await this.languagesRepository.delete(id);
  }
}
