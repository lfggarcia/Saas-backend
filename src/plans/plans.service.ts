import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from '../entities/plan.entity';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plan)
    private plansRepository: Repository<Plan>,
  ) {}

  // Obtener todos los planes
  getAllPlans() {
    return this.plansRepository.find();
  }

  // Obtener un plan específico
  getPlanById(id: string) {
    return this.plansRepository.findOne({ where: { id } });
  }

  // Crear un nuevo plan
  createPlan(createPlanDto: any) {
    const newPlan = this.plansRepository.create(createPlanDto);
    return this.plansRepository.save(newPlan);
  }

  // Actualizar un plan existente
  async updatePlan(id: string, updatePlanDto: any) {
    const plan = await this.plansRepository.findOne({ where: { id } });
    if (!plan) {
      throw new Error('Plan not found');
    }
    Object.assign(plan, updatePlanDto);  // Actualizamos los campos
    return this.plansRepository.save(plan);
  }

  // Eliminar un plan
  deletePlan(id: string) {
    return this.plansRepository.delete(id);
  }
}
