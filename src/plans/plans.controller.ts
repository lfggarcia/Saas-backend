import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { PlansService } from './plans.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { SuperAdminGuard } from 'src/auth/super-admin/super-admin.guard';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  // Obtener todos los planes (acceso para todos)
  @Get()
  getAllPlans() {
    return this.plansService.getAllPlans();
  }

  // Obtener un plan específico (acceso para todos)
  @Get(':id')
  getPlanById(@Param('id') id: string) {
    return this.plansService.getPlanById(id);
  }

  // Crear un nuevo plan (solo super admin)
  @UseGuards(JwtAuthGuard, SuperAdminGuard)  // Solo super admin puede crear
  @Post()
  createPlan(@Body() createPlanDto: any) {
    return this.plansService.createPlan(createPlanDto);
  }

  // Actualizar un plan existente (solo super admin)
  @UseGuards(JwtAuthGuard, SuperAdminGuard)  // Solo super admin puede actualizar
  @Put(':id')
  updatePlan(@Param('id') id: string, @Body() updatePlanDto: any) {
    return this.plansService.updatePlan(id, updatePlanDto);
  }

  // Eliminar un plan (solo super admin)
  @UseGuards(JwtAuthGuard, SuperAdminGuard)  // Solo super admin puede eliminar
  @Delete(':id')
  deletePlan(@Param('id') id: string) {
    return this.plansService.deletePlan(id);
  }
}
