import { Module } from '@nestjs/common';
import { ScreenComponentOverridesService } from './screen-component-overrides.service';
import { ScreenComponentOverridesController } from './screen-component-overrides.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreenComponentOverrides } from '../../entities';
import { ScreenComponentsModule } from '../screen-components/screen-components.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([ScreenComponentOverrides])
		,ScreenComponentsModule
	],
  controllers: [ScreenComponentOverridesController],
  providers: [ScreenComponentOverridesService],
	exports: [ScreenComponentOverridesService],
})
export class ScreenComponentOverridesModule {}
