import { Module } from '@nestjs/common';
import { ReducersService } from './reducers.service';

@Module({
  providers: [ReducersService]
})
export class ReducersModule {}
