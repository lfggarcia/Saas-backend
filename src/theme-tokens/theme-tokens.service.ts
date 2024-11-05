import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ThemeToken } from './entities/theme-token.entity';
import { CreateThemeTokenDto } from './dto/create-theme-token.dto';
import { UpdateThemeTokenDto } from './dto/update-theme-token.dto';

@Injectable()
export class ThemeTokensService {
  constructor(
    @InjectRepository(ThemeToken)
    private themeTokensRepository: Repository<ThemeToken>,
  ) {}

  async create(createThemeTokenDto: CreateThemeTokenDto, userId: string): Promise<ThemeToken> {
    // Verificar si el usuario es propietario del tema
    const theme = await this.themeTokensRepository.manager.findOne("Theme", {
			where: { id: createThemeTokenDto.theme_id },
			relations: ['application', 'application.user']
		});

    if (!theme) {
      throw new NotFoundException('Tema no encontrado');
    }

    if (theme.application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para agregar tokens a este tema');
    }

    const themeToken = this.themeTokensRepository.create({
      ...createThemeTokenDto,
      theme: { id: createThemeTokenDto.theme_id },
      tokenGroup: { id: createThemeTokenDto.token_group_id },
    });

    return this.themeTokensRepository.save(themeToken);
  }

  async findAllByTheme(themeId: string, userId: string): Promise<ThemeToken[]> {
    const theme = await this.themeTokensRepository.manager.findOne('Theme', {
      where: { id: themeId },
      relations: ['application', 'application.user'],
    });

    if (!theme) {
      throw new NotFoundException('Tema no encontrado');
    }

    if (theme.application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a los tokens de este tema');
    }

    return this.themeTokensRepository.find({
      where: { theme: { id: themeId } },
      relations: ['tokenGroup'],
    });
  }

  async findOne(id: string, userId: string): Promise<ThemeToken> {
    const themeToken = await this.themeTokensRepository.findOne({
      where: { id },
      relations: ['theme', 'theme.application', 'theme.application.user', 'tokenGroup'],
    });

    if (!themeToken) {
      throw new NotFoundException('Token del tema no encontrado');
    }

    if (themeToken.theme.application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a este token del tema');
    }

    return themeToken;
  }

  async update(id: string, updateThemeTokenDto: UpdateThemeTokenDto, userId: string): Promise<ThemeToken> {
    const themeToken = await this.findOne(id, userId);

    if (updateThemeTokenDto.token_group_id) {
      updateThemeTokenDto.tokenGroup = { id: updateThemeTokenDto.token_group_id };
    }

    await this.themeTokensRepository.update(id, {
      ...updateThemeTokenDto,
      tokenGroup: updateThemeTokenDto.tokenGroup,
    });

    return this.themeTokensRepository.findOne(id, { relations: ['tokenGroup'] });
  }

  async remove(id: string, userId: string): Promise<void> {
    const themeToken = await this.findOne(id, userId);

    await this.themeTokensRepository.delete(id);
  }
}
