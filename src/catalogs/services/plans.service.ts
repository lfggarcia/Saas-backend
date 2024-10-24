import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from '../entities/plan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plan)
    private plansRepository: Repository<Plan>,
  ) {}

  findAll(): Promise<Plan[]> {
    return this.plansRepository.find();
  }

  findOne(id: string): Promise<Plan> {
    return this.plansRepository.findOne({ where: { id } });
  }

  create(plan: Partial<Plan>): Promise<Plan> {
    const newPlan = this.plansRepository.create(plan);
    return this.plansRepository.save(newPlan);
  }

  async update(id: string, plan: Partial<Plan>): Promise<Plan> {
    await this.plansRepository.update(id, plan);
    return this.plansRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.plansRepository.delete(id);
  }
}
