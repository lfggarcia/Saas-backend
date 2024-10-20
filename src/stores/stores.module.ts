import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { Store } from '../entities/store.entity';
import { Application } from '../entities/application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Store, Application])],  // Registramos las entidades necesarias
  providers: [StoresService],  // Incluimos el servicio
  controllers: [StoresController],  // Incluimos el controlador
})
export class StoresModule {}
