import { Module } from '@nestjs/common';
import { ReducersService } from './reducers.service';
import { ReducersController } from './reducers.controller';

@Module({
  providers: [ReducersService],
  controllers: [ReducersController]
})
export class ReducersModule {}
