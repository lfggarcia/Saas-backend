import { Module } from '@nestjs/common';
import { FeaturesService } from './features.service';

@Module({
  providers: [FeaturesService]
})
export class FeaturesModule {}
