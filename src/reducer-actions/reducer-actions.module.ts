import { Module } from '@nestjs/common';
import { ReducerActionsService } from './reducer-actions.service';
import { ReducerActionsController } from './reducer-actions.controller';

@Module({
  providers: [ReducerActionsService],
  controllers: [ReducerActionsController]
})
export class ReducerActionsModule {}
