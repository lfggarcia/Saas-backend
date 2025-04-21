import { Module } from '@nestjs/common';
import { FeatureVersionsService } from './feature-versions.service';
import { FeatureVersionsController } from './feature-versions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeaturesModule } from '../features/features.module';
import { UsersModule } from '../users/users.module';
import { FeatureVersions } from '../../entities';

@Module({
	imports: [
		TypeOrmModule.forFeature([FeatureVersions])
		,FeaturesModule
		,UsersModule
	],
  controllers: [FeatureVersionsController],
  providers: [FeatureVersionsService],
	exports: [FeatureVersionsService]
})
export class FeatureVersionsModule {}
