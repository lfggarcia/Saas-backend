import { Module } from '@nestjs/common';
import { FeatureScreensService } from './feature-screens.service';
import { FeatureScreensController } from './feature-screens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeaturesModule } from '../features/features.module';
import { ScreensModule } from '../screens/screens.module';
import { FeatureScreens } from '../../entities';

@Module({
	imports: [
		TypeOrmModule.forFeature([FeatureScreens])
		,FeaturesModule
		,ScreensModule
	],
  controllers: [FeatureScreensController],
  providers: [FeatureScreensService],
	exports: [FeatureScreensService],
})
export class FeatureScreensModule {}
