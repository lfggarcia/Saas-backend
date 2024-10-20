import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ThemeToken } from '../entities/theme-token.entity';
import { Theme } from '../entities/theme.entity';

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

  // Crear un nuevo token de tema
  async createThemeToken(themeId: string, createThemeTokenDto: any) {
    const theme = await this.themesRepository.findOne({ where: { id: themeId } });

    if (!theme) {
      throw new Error('Theme not found');
    }

    const newThemeToken = this.themeTokensRepository.create({
      ...createThemeTokenDto,
      theme,
    });

    return this.themeTokensRepository.save(newThemeToken);
  }

  // Actualizar un token de tema existente
  async updateThemeToken(id: string, updateThemeTokenDto: any) {
    const themeToken = await this.themeTokensRepository.findOne({ where: { id } });
    if (!themeToken) {
      throw new Error('Theme token not found');
    }
    Object.assign(themeToken, updateThemeTokenDto);  // Actualizamos los campos
    return this.themeTokensRepository.save(themeToken);
  }

  // Eliminar un token de tema
  deleteThemeToken(id: string) {
    return this.themeTokensRepository.delete(id);
  }
}
