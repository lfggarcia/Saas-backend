import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { App } from './entities/app.entity';
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';

@Injectable()
export class AppsService {
  constructor(
    @InjectRepository(App)
    private appsRepository: Repository<App>,
  ) {}

  create(createAppDto: CreateAppDto, userId: string): Promise<App> {
    const app = this.appsRepository.create({
      ...createAppDto,
      user: { id: userId },
      status: { id: createAppDto.status_id },
    });
    return this.appsRepository.save(app);
  }

  findAll(): Promise<App[]> {
    return this.appsRepository.find({ relations: ['user', 'status'] });
  }

  findAllByUser(userId: string): Promise<App[]> {
    return this.appsRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'status'],
    });
  }

  findOne(id: string): Promise<App> {
    return this.appsRepository.findOne({
      where: { id },
      relations: ['user', 'status'],
    });
  }

  async update(id: string, updateAppDto: UpdateAppDto): Promise<App> {
    await this.appsRepository.update(id, {
      ...updateAppDto,
      status: updateAppDto.status_id ? { id: updateAppDto.status_id } : undefined,
    });
    return this.appsRepository.findOne({ where: { id }, relations: ['user', 'status'] });
  }

  async remove(id: string): Promise<void> {
    await this.appsRepository.delete(id);
  }

  async checkOwnership(appId: string, userId: string): Promise<void> {
    const app = await this.findOne(appId);
    if (!app) {
      throw new Error('App not found');
    }
    if (app.user.id !== userId) {
      throw new ForbiddenException('No tienes permiso para acceder a esta aplicación');
    }
  }
}
