import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FeatureVersionsService } from './feature-versions.service';
import { FeatureVersionsController } from './feature-versions.controller';
import { FeatureVersion } from './entities/feature-version.entity';
import { Feature } from '../features/entities/feature.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FeatureVersion, Feature]),
    AuthModule,
  ],
  providers: [FeatureVersionsService],
  controllers: [FeatureVersionsController],
})
export class FeatureVersionsModule {}