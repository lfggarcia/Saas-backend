import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalComponentsService } from './global-components.service';
import { GlobalComponentsController } from './global-components.controller';
import { GlobalComponent } from '../entities/global-component.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GlobalComponent])],  // Registramos la entidad
  providers: [GlobalComponentsService],  // Incluimos el servicio
  controllers: [GlobalComponentsController],  // Incluimos el controlador
})
export class GlobalComponentsModule {}
