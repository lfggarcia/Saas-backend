import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { Store } from './entities/store.entity';
import { App } from '../apps/entities/app.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Store, App]),
    AuthModule,
  ],
  providers: [StoresService],
  controllers: [StoresController],
})
export class StoresModule {}
