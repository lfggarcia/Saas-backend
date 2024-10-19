import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PlansService } from './plans.service';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  // Obtener todos los planes
  @Get()
  getAllPlans() {
    return this.plansService.getAllPlans();
  }

  // Obtener un plan específico
  @Get(':id')
  getPlanById(@Param('id') id: string) {
    return this.plansService.getPlanById(id);
  }

  // Crear un nuevo plan
  @Post()
  createPlan(@Body() createPlanDto: any) {
    return this.plansService.createPlan(createPlanDto);
  }

  // Actualizar un plan existente
  @Put(':id')
  updatePlan(@Param('id') id: string, @Body() updatePlanDto: any) {
    return this.plansService.updatePlan(id, updatePlanDto);
  }

  // Eliminar un plan
  @Delete(':id')
  deletePlan(@Param('id') id: string) {
    return this.plansService.deletePlan(id);
  }
}
