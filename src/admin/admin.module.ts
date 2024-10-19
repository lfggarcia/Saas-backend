import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { User } from '../entities/user.entity';
import { Plan } from '../entities/plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Plan])],  // Registramos las entidades que se usan en este módulo
  providers: [AdminService],  // Incluimos el servicio
  controllers: [AdminController],  // Incluimos el controlador
})
export class AdminModule {}
