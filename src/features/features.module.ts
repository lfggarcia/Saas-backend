// features.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeaturesService } from './features.service';
import { FeaturesController } from './features.controller';
import { Feature } from '../entities/feature.entity';
import { Application } from '../entities/application.entity';
import { Plan } from '../entities/plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Feature, Application, Plan])],
  providers: [FeaturesService],
  controllers: [FeaturesController],
})
export class FeaturesModule {}
