import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReducerActionsService } from './reducer-actions.service';
import { ReducerActionsController } from './reducer-actions.controller';
import { ReducerAction } from './entities/reducer-action.entity';
import { Reducer } from '../reducers/entities/reducer.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReducerAction, Reducer]),
    AuthModule,
  ],
  providers: [ReducerActionsService],
  controllers: [ReducerActionsController],
})
export class ReducerActionsModule {}
