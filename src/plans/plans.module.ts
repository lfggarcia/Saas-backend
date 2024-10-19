import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { Plan } from '../entities/plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plan])],  // Registramos la entidad
  providers: [PlansService],  // Incluimos el servicio
  controllers: [PlansController],  // Incluimos el controlador
})
export class PlansModule {}
