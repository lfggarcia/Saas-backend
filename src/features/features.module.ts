import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FeaturesService } from './features.service';
import { FeaturesController } from './features.controller';
import { Feature } from './entities/feature.entity';
import { App } from '../apps/entities/app.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Feature, App])],
  providers: [FeaturesService],
  controllers: [FeaturesController],
})
export class FeaturesModule {}
