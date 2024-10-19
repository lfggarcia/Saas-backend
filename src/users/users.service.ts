import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from '../entities/application.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Application)
    private appsRepository: Repository<Application>,
    
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getAllApps(userId: string) {
    return this.appsRepository.find({ where: { user: { id: userId } } });
  }

  createApp(createAppDto: any, userId: string) {
    const user = this.usersRepository.findOne({ where: { id: userId } });
    const newApp = this.appsRepository.create({ ...createAppDto, user });
    return this.appsRepository.save(newApp);
  }

  getAppById(id: string) {
    return this.appsRepository.findOne({ where: { id }, relations: ['user'] });  // Corregido para usar un solo argumento
  }
}