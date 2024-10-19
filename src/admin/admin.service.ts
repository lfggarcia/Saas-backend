import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Plan } from '../entities/plan.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    
    @InjectRepository(Plan)
    private plansRepository: Repository<Plan>,
  ) {}

  getAllUsers() {
    return this.usersRepository.find();
  }

  createPlan(createPlanDto: any) {
    const newPlan = this.plansRepository.create(createPlanDto);
    return this.plansRepository.save(newPlan);
  }

  deleteUser(id: string) {
    return this.usersRepository.delete(id);
  }
}
