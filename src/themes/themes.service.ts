import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Theme } from '../entities/theme.entity';
import { Application } from '../entities/application.entity';
import { CreateThemeDto } from './dto/create-theme.dto/create-theme.dto';

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

	async createTheme(appId: string, createThemeDto: CreateThemeDto, userId: string) {
		const application = await this.applicationsRepository.findOne({
			where: { id: appId },
			relations: ['user'],
		});
	
		if (!application || application.user.id !== userId) {
			throw new Error('You are not authorized to create a theme for this application');
		}
	
		const newTheme = this.themesRepository.create({
			...createThemeDto,
			application,
		});
	
		return this.themesRepository.save(newTheme);
	}
	
	async updateTheme(id: string, updateThemeDto: CreateThemeDto, userId: string) {
		const theme = await this.themesRepository.findOne({
			where: { id },
			relations: ['application', 'application.user'],
		});
	
		if (!theme || theme.application.user.id !== userId) {
			throw new Error('You are not authorized to update this theme');
		}
	
		Object.assign(theme, updateThemeDto);  // Actualizamos los campos
		return this.themesRepository.save(theme);
	}
	
	async deleteTheme(id: string, userId: string) {
		const theme = await this.themesRepository.findOne({
			where: { id },
			relations: ['application', 'application.user'],
		});
	
		if (!theme || theme.application.user.id !== userId) {
			throw new Error('You are not authorized to delete this theme');
		}
	
		return this.themesRepository.delete(id);
	}
	
}
