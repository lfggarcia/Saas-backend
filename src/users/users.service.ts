import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from '../entities/application.entity';
import { User } from '../entities/user.entity';
import { CreateApplicationDto } from 'src/applications/dto/create-application.dto/create-application.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Application)
    private appsRepository: Repository<Application>,
    
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Obtener todas las aplicaciones de un usuario
  getAllApps(userId: string) {
    return this.appsRepository.find({ where: { user: { id: userId } } });
  }

  // Obtener una aplicación específica
  getAppById(id: string) {
    return this.appsRepository.findOne({ where: { id }, relations: ['user'] });
  }

  // Crear una nueva aplicación
  async createApp(createAppDto: CreateApplicationDto, userId: string) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const newApp = this.appsRepository.create({ ...createAppDto, user });
    return this.appsRepository.save(newApp);
  }

  // Actualizar una aplicación existente
  async updateApp(id: string, updateAppDto: any) {
    const app = await this.appsRepository.findOne({ where: { id } });
    if (!app) {
      throw new Error('Application not found');
    }
    Object.assign(app, updateAppDto);  // Actualizamos los campos
    return this.appsRepository.save(app);
  }

  // Eliminar una aplicación
  deleteApp(id: string) {
    return this.appsRepository.delete(id);
  }
}
