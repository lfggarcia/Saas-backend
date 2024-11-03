import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Theme } from './entities/theme.entity';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';

@Injectable()
export class ThemesService {
  constructor(
    @InjectRepository(Theme)
    private themesRepository: Repository<Theme>,
  ) {}

  async create(createThemeDto: CreateThemeDto, userId: string): Promise<Theme> {
    // Verificar si el usuario es propietario de la aplicación
    const application = await this.themesRepository.manager.findOne('App', createThemeDto.application_id, {
      relations: ['user'],
    });

    if (!application) {
      throw new NotFoundException('Aplicación no encontrada');
    }

    if (application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para agregar temas a esta aplicación');
    }

    const theme = this.themesRepository.create({
      ...createThemeDto,
      application: { id: createThemeDto.application_id },
    });

    return this.themesRepository.save(theme);
  }

  async findAll(userId: string): Promise<Theme[]> {
    return this.themesRepository.find({
      where: { application: { user: { id: userId } } },
      relations: ['application'],
    });
  }

  async findOne(id: string, userId: string): Promise<Theme> {
    const theme = await this.themesRepository.findOne({
      where: { id },
      relations: ['application', 'application.user'],
    });

    if (!theme) {
      throw new NotFoundException('Tema no encontrado');
    }

    if (theme.application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a este tema');
    }

    return theme;
  }

  async update(id: string, updateThemeDto: UpdateThemeDto, userId: string): Promise<Theme> {
    const theme = await this.findOne(id, userId);

    await this.themesRepository.update(id, updateThemeDto);

    return this.themesRepository.findOne(id);
  }

  async remove(id: string, userId: string): Promise<void> {
    const theme = await this.findOne(id, userId);

    await this.themesRepository.delete(id);
  }
}
