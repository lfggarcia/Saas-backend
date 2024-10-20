import { Module } from '@nestjs/common';
import { ReducerActionsService } from './reducer-actions.service';

@Module({
  providers: [ReducerActionsService]
})
export class ReducerActionsModule {}
