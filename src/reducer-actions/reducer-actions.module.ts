import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReducerActionsService } from './reducer-actions.service';
import { ReducerActionsController } from './reducer-actions.controller';
import { ReducerAction } from '../entities/reducer-action.entity';
import { Reducer } from '../entities/reducer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReducerAction, Reducer])],  // Registramos las entidades necesarias
  providers: [ReducerActionsService],  // Incluimos el servicio
  controllers: [ReducerActionsController],  // Incluimos el controlador
})
export class ReducerActionsModule {}
