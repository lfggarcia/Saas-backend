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
  getAllApps(userId: string, page: number = 1, limit: number = 10) {
    return this.appsRepository.find({
			where: { user: { id: userId } },
			relations: ['user'],
			skip: (page - 1) * limit,
			take: limit,
		})
  }

  // Obtener una aplicación específica
  getAppById(id: string) {
    return this.appsRepository.findOne({ where: { id }, relations: ['user'] });
  }

  // Crear una nueva aplicación
  async createApp(createAppDto: CreateApplicationDto, userId: string) {

		const user = await this.usersRepository.findOne({
			where: {
				id: userId
			},
			relations: ['plan', 'applications']
		});
		
		const currentAppCount = user.applications.length;
		if (currentAppCount >= user.plan.max_apps) {
			throw new Error(`You have reached the maximum number of applications allowed for your plan: ${user.plan.max_apps}`);
		}
	
		// Crear la nueva aplicación
		const newApp = this.appsRepository.create({ ...createAppDto, user });
		return this.appsRepository.save(newApp);
	}
	

  // Actualizar una aplicación existente
  async updateApp(id: string, updateAppDto: any, userId: string) {
    const app = await this.appsRepository.findOne({ where: { id }, relations: ['user'] });
    if (!app) {
      throw new Error('Application not found');
    }

		if (app.user.id !== userId) {
			throw new Error('You are not authorized to modify this application');
		}

    Object.assign(app, updateAppDto);  // Actualizamos los campos
    return this.appsRepository.save(app);
  }

  // Eliminar una aplicación
  async deleteApp(id: string, userId: string) {
		const app = await this.appsRepository.findOne({ where: { id }, relations: ['user', 'features'] });
		if (!app) {
			throw new Error('Application not found');
		}

		if (app.user.id !== userId) {
			throw new Error('You are not authorized to modify this application');
		}

		if (app.features.length) {
			throw new Error('You cannot delete an application with features');
		}

    return this.appsRepository.delete(id);
  }
}
