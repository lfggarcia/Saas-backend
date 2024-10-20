import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomToken } from '../entities/custom-token.entity';
import { Theme } from '../entities/theme.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class CustomTokensService {
  constructor(
    @InjectRepository(CustomToken)
    private customTokensRepository: Repository<CustomToken>,

    @InjectRepository(Theme)
    private themesRepository: Repository<Theme>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Obtener todos los tokens personalizados de un tema y usuario
  getAllCustomTokens(themeId: string, userId: string) {
    return this.customTokensRepository.find({ where: { theme: { id: themeId }, user: { id: userId } } });
  }

  // Obtener un token personalizado específico
  getCustomTokenById(id: string) {
    return this.customTokensRepository.findOne({ where: { id }, relations: ['theme', 'user'] });
  }

  // Crear un nuevo token personalizado
  async createCustomToken(themeId: string, userId: string, createCustomTokenDto: any) {
    const theme = await this.themesRepository.findOne({ where: { id: themeId } });
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!theme || !user) {
      throw new Error('Theme or user not found');
    }

    const newCustomToken = this.customTokensRepository.create({
      ...createCustomTokenDto,
      theme,
      user,
    });

    return this.customTokensRepository.save(newCustomToken);
  }

  // Actualizar un token personalizado existente
  async updateCustomToken(id: string, updateCustomTokenDto: any) {
    const customToken = await this.customTokensRepository.findOne({ where: { id } });
    if (!customToken) {
      throw new Error('Custom token not found');
    }
    Object.assign(customToken, updateCustomTokenDto);  // Actualizamos los campos
    return this.customTokensRepository.save(customToken);
  }

  // Eliminar un token personalizado
  deleteCustomToken(id: string) {
    return this.customTokensRepository.delete(id);
  }
}
