import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from '../entities/application.entity';
import { User } from '../entities/user.entity';
import { CreateApplicationDto } from 'src/applications/dto/create-application.dto/create-application.dto';
import { Plan } from '../entities/plan.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Application)
    private appsRepository: Repository<Application>,
    
    @InjectRepository(User)
    private usersRepository: Repository<User>,

		@InjectRepository(Plan)
		private plansRepository: Repository<Plan>,
  ) {}

	isOwner(appId: string, userId: string) {
		return this.appsRepository.findOne({
			where: {
				id: appId,
				user: {
					id: userId
				}
			}
		});
	}

  getAllApps(userId: string, page: number = 1, limit: number = 10) {
    return this.appsRepository.find({
			where: { user: { id: userId } },
			relations: ['user'],
			skip: (page - 1) * limit,
			take: limit,
		})
  }

  getAppById(id: string) {
    return this.appsRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async createApp(createAppDto: CreateApplicationDto, userId: string) {

		const user = await this.usersRepository.findOne({ where: { id: userId }, relations: ['plan'] });
    const plan = user.plan;

    const userAppsCount = await this.appsRepository.count({ where: { user: { id: userId } } });

    if (userAppsCount >= plan.max_apps) {
      throw new Error('You have reached the maximum number of applications allowed by your plan.');
    }

    const newApp = this.appsRepository.create({ ...createAppDto, user });
    return this.appsRepository.save(newApp);
	}

  async updateApp(id: string, updateAppDto: any, userId: string) {
    const app = await this.appsRepository.findOne({ where: { id }, relations: ['user'] });
    if (!app) {
      throw new Error('Application not found');
    }

		if (app.user.id !== userId) {
			throw new Error('You are not authorized to modify this application');
		}

    Object.assign(app, updateAppDto);
    return this.appsRepository.save(app);
  }

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
