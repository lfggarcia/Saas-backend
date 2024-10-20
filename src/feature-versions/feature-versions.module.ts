import { Module } from '@nestjs/common';
import { FeatureVersionsService } from './feature-versions.service';

@Module({
  providers: [FeatureVersionsService]
})
export class FeatureVersionsModule {}
