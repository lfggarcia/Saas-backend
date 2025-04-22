import { Module } from '@nestjs/common';
import { FeatureVersionScreensService } from './feature-version-screens.service';
import { FeatureVersionScreensController } from './feature-version-screens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatureVersionScreens } from '../../entities';
import { FeatureVersionsModule } from '../feature-versions/feature-versions.module';
import { ScreenVersionsModule } from '../screen-versions/screen-versions.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([FeatureVersionScreens])
		,FeatureVersionsModule
		,ScreenVersionsModule
	],
  controllers: [FeatureVersionScreensController],
  providers: [FeatureVersionScreensService],
	exports: [FeatureVersionScreensService]
})
export class FeatureVersionScreensModule {}
