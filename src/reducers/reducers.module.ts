import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReducersService } from './reducers.service';
import { ReducersController } from './reducers.controller';
import { Reducer } from '../entities/reducer.entity';
import { Store } from '../entities/store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reducer, Store])],  // Registramos las entidades necesarias
  providers: [ReducersService],  // Incluimos el servicio
  controllers: [ReducersController],  // Incluimos el controlador
})
export class ReducersModule {}
