import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CustomToken } from './entities/custom-token.entity';
import { CreateCustomTokenDto } from './dto/create-custom-token.dto';
import { UpdateCustomTokenDto } from './dto/update-custom-token.dto';

@Injectable()
export class CustomTokensService {
  constructor(
    @InjectRepository(CustomToken)
    private customTokensRepository: Repository<CustomToken>,
  ) {}

  async create(createCustomTokenDto: CreateCustomTokenDto, userId: string): Promise<CustomToken> {
    // Verificar si el usuario es propietario del tema
    const theme = await this.customTokensRepository.manager.findOne('Theme', {
      where: { id: createCustomTokenDto.theme_id },
      relations: ['application', 'application.user'],
    });

    if (!theme) {
      throw new NotFoundException('Tema no encontrado');
    }

    if (theme.application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para agregar tokens personalizados a este tema');
    }

    const customToken = this.customTokensRepository.create({
      ...createCustomTokenDto,
      theme: { id: createCustomTokenDto.theme_id },
      user: { id: userId },
      tokenGroup: { id: createCustomTokenDto.token_group_id },
    });

    return this.customTokensRepository.save(customToken);
  }

  async findAllByTheme(themeId: string, userId: string): Promise<CustomToken[]> {
    const theme = await this.customTokensRepository.manager.findOne('Theme', {
      where: { id: themeId },
      relations: ['application', 'application.user'],
    });

    if (!theme) {
      throw new NotFoundException('Tema no encontrado');
    }

    if (theme.application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a los tokens personalizados de este tema');
    }

    return this.customTokensRepository.find({
      where: { theme: { id: themeId }, user: { id: userId } },
      relations: ['tokenGroup'],
    });
  }

  async findOne(id: string, userId: string): Promise<CustomToken> {
    const customToken = await this.customTokensRepository.findOne({
      where: { id },
      relations: ['theme', 'theme.application', 'theme.application.user', 'tokenGroup', 'user'],
    });

    if (!customToken) {
      throw new NotFoundException('Token personalizado no encontrado');
    }

    if (customToken.theme.application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a este token personalizado');
    }

    return customToken;
  }

  async update(id: string, updateCustomTokenDto: UpdateCustomTokenDto, userId: string): Promise<CustomToken> {
    const customToken = await this.findOne(id, userId);

    if (updateCustomTokenDto.token_group_id) {
      updateCustomTokenDto.tokenGroup = { id: updateCustomTokenDto.token_group_id };
    }

    await this.customTokensRepository.update(id, {
      ...updateCustomTokenDto,
      tokenGroup: updateCustomTokenDto.tokenGroup,
    });

    return this.customTokensRepository.findOne(id, { relations: ['tokenGroup'] });
  }

  async remove(id: string, userId: string): Promise<void> {
    const customToken = await this.findOne(id, userId);

    await this.customTokensRepository.delete(id);
  }
}
