import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReducersService } from './reducers.service';
import { ReducersController } from './reducers.controller';
import { Reducer } from './entities/reducer.entity';
import { Store } from '../stores/entities/store.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reducer, Store]),
    AuthModule,
  ],
  providers: [ReducersService],
  controllers: [ReducersController],
})
export class ReducersModule {}
