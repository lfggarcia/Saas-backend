import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentPoolService } from './component-pool.service';
import { ComponentPoolController } from './component-pool.controller';
import { ComponentTypesModule } from '../component_types/component_types.module';
import { ComponentPool } from '../../entities';
import { ScreensModule } from '../screens/screens.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([ComponentPool]),
		ScreensModule,
		ComponentTypesModule,
	],
  controllers: [ComponentPoolController],
  providers: [ComponentPoolService],
	exports: [ComponentPoolService],
})
export class ComponentPoolModule {}
