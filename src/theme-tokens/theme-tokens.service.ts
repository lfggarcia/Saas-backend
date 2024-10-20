import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ThemeToken } from '../entities/theme-token.entity';
import { Theme } from '../entities/theme.entity';
import { CreateThemeTokenDto } from './dto/create-theme-token.dto/create-theme-token.dto';

@Injectable()
export class ThemeTokensService {
  constructor(
    @InjectRepository(ThemeToken)
    private themeTokensRepository: Repository<ThemeToken>,

    @InjectRepository(Theme)
    private themesRepository: Repository<Theme>,
  ) {}

  // Obtener todos los tokens de un tema
  getAllThemeTokens(themeId: string) {
    return this.themeTokensRepository.find({ where: { theme: { id: themeId } } });
  }

  // Obtener un token específico
  getThemeTokenById(id: string) {
    return this.themeTokensRepository.findOne({ where: { id }, relations: ['theme'] });
  }

	async createThemeToken(themeId: string, createThemeTokenDto: CreateThemeTokenDto, userId: string) {
		const theme = await this.themesRepository.findOne({
			where: { id: themeId },
			relations: ['application', 'application.user'],
		});
	
		if (!theme || theme.application.user.id !== userId) {
			throw new Error('You are not authorized to create a token for this theme');
		}
	
		const newThemeToken = this.themeTokensRepository.create({
			...createThemeTokenDto,
			theme,
		});
	
		return this.themeTokensRepository.save(newThemeToken);
	}
	
	async updateThemeToken(id: string, updateThemeTokenDto: CreateThemeTokenDto, userId: string) {
		const themeToken = await this.themeTokensRepository.findOne({
			where: { id },
			relations: ['theme', 'theme.application', 'theme.application.user'],
		});
	
		if (!themeToken || themeToken.theme.application.user.id !== userId) {
			throw new Error('You are not authorized to update this token');
		}
	
		Object.assign(themeToken, updateThemeTokenDto);  // Actualizamos los campos
		return this.themeTokensRepository.save(themeToken);
	}
	
	async deleteThemeToken(id: string, userId: string) {
		const themeToken = await this.themeTokensRepository.findOne({
			where: { id },
			relations: ['theme', 'theme.application', 'theme.application.user'],
		});
	
		if (!themeToken || themeToken.theme.application.user.id !== userId) {
			throw new Error('You are not authorized to delete this token');
		}
	
		return this.themeTokensRepository.delete(id);
	}
	
}
