import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GlobalStyle } from './entities/global-style.entity';
import { CreateGlobalStyleDto } from './dto/create-global-style.dto';
import { UpdateGlobalStyleDto } from './dto/update-global-style.dto';
import { App } from '../apps/entities/app.entity';

@Injectable()
export class GlobalStylesService {
  constructor(
    @InjectRepository(GlobalStyle)
    private globalStylesRepository: Repository<GlobalStyle>,
    @InjectRepository(App)
    private appsRepository: Repository<App>,
  ) {}

  async create(createGlobalStyleDto: CreateGlobalStyleDto, userId: string): Promise<GlobalStyle> {
    // Verificar si el usuario es propietario de la aplicación
    const application = await this.appsRepository.findOne({
			where: {
				id: createGlobalStyleDto.application_id
			},
			relations: ['user'],
		})

    if (!application) {
      throw new NotFoundException('Aplicación no encontrada');
    }

    if (application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para agregar estilos globales a esta aplicación');
    }

    const globalStyle = this.globalStylesRepository.create({
      ...createGlobalStyleDto,
      application: { id: createGlobalStyleDto.application_id },
    });

    return this.globalStylesRepository.save(globalStyle);
  }

  async findAllByApplication(applicationId: string, userId: string): Promise<GlobalStyle[]> {
    const application = await this.appsRepository.findOne({
			where: {
				id: applicationId
			},
			relations: ['user'],
		});

    if (!application) {
      throw new NotFoundException('Aplicación no encontrada');
    }

    if (application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a los estilos globales de esta aplicación');
    }

    return this.globalStylesRepository.find({
      where: { application: { id: applicationId } },
    });
  }

  async findOne(id: string, userId: string): Promise<GlobalStyle> {
    const globalStyle = await this.globalStylesRepository.findOne({
			where: { id },
			relations: ['application', 'application.user'],
		});

    if (!globalStyle) {
      throw new NotFoundException('Estilo global no encontrado');
    }

    if (globalStyle.application.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a este estilo global');
    }

    return globalStyle;
  }

  async update(id: string, updateGlobalStyleDto: UpdateGlobalStyleDto, userId: string): Promise<GlobalStyle> {
    const globalStyle = await this.findOne(id, userId);

    await this.globalStylesRepository.update(id, updateGlobalStyleDto);

    return this.globalStylesRepository.findOne({
			where: { id },
		});
  }

  async remove(id: string, userId: string): Promise<void> {
    const globalStyle = await this.findOne(id, userId);

    await this.globalStylesRepository.delete(id);
  }
}
