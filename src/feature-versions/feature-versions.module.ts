import { Module } from '@nestjs/common';
import { FeatureVersionsService } from './feature-versions.service';
import { FeatureVersionsController } from './feature-versions.controller';

@Module({
  providers: [FeatureVersionsService],
  controllers: [FeatureVersionsController]
})
export class FeatureVersionsModule {}
