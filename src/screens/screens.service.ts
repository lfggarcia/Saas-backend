import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Screen } from './entities/screen.entity';
import { CreateScreenDto } from './dto/create-screen.dto';
import { UpdateScreenDto } from './dto/update-screen.dto';

@Injectable()
export class ScreensService {
  constructor(
    @InjectRepository(Screen)
    private screensRepository: Repository<Screen>,
  ) {}

  async create(createScreenDto: CreateScreenDto, userId: string): Promise<Screen> {
    // Verificar si el usuario es propietario de la característica
    const feature = await this.screensRepository.manager.findOne('Feature', createScreenDto.feature_id, {
      relations: ['app', 'app.user'],
    });

    if (!feature) {
      throw new NotFoundException('Característica no encontrada');
    }

    if (feature.app.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para agregar pantallas a esta característica');
    }

    const screen = this.screensRepository.create({
      ...createScreenDto,
      feature: { id: createScreenDto.feature_id },
    });

    return this.screensRepository.save(screen);
  }

  async findAll(userId: string): Promise<Screen[]> {
    return this.screensRepository.find({
      where: { feature: { app: { user: { id: userId } } } },
      relations: ['feature'],
    });
  }

  async findOne(id: string, userId: string): Promise<Screen> {
    const screen = await this.screensRepository.findOne({
      where: { id },
      relations: ['feature', 'feature.app', 'feature.app.user'],
    });

    if (!screen) {
      throw new NotFoundException('Pantalla no encontrada');
    }

    if (screen.feature.app.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a esta pantalla');
    }

    return screen;
  }

  async update(id: string, updateScreenDto: UpdateScreenDto, userId: string): Promise<Screen> {
    const screen = await this.findOne(id, userId);

    await this.screensRepository.update(id, updateScreenDto);

    return this.screensRepository.findOne(id);
  }

  async remove(id: string, userId: string): Promise<void> {
    const screen = await this.findOne(id, userId);

    await this.screensRepository.delete(id);
  }
}
