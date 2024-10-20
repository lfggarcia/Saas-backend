import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Theme } from '../entities/theme.entity';
import { Application } from '../entities/application.entity';

@Injectable()
export class ThemesService {
  constructor(
    @InjectRepository(Theme)
    private themesRepository: Repository<Theme>,

    @InjectRepository(Application)
    private applicationsRepository: Repository<Application>,
  ) {}

  // Obtener todos los temas de una aplicación
  getAllThemes(appId: string) {
    return this.themesRepository.find({ where: { application: { id: appId } } });
  }

  // Obtener un tema específico
  getThemeById(id: string) {
    return this.themesRepository.findOne({ where: { id }, relations: ['application'] });
  }

  // Crear un nuevo tema
  async createTheme(appId: string, createThemeDto: any) {
    const application = await this.applicationsRepository.findOne({ where: { id: appId } });

    if (!application) {
      throw new Error('Application not found');
    }

    const newTheme = this.themesRepository.create({
      ...createThemeDto,
      application,
    });

    return this.themesRepository.save(newTheme);
  }

  // Actualizar un tema existente
  async updateTheme(id: string, updateThemeDto: any) {
    const theme = await this.themesRepository.findOne({ where: { id } });
    if (!theme) {
      throw new Error('Theme not found');
    }
    Object.assign(theme, updateThemeDto);  // Actualizamos los campos
    return this.themesRepository.save(theme);
  }

  // Eliminar un tema
  deleteTheme(id: string) {
    return this.themesRepository.delete(id);
  }
}
