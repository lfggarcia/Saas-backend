import { Module } from '@nestjs/common';
import { ComponentPoolPropertiesService } from './component-pool-properties.service';
import { ComponentPoolPropertiesController } from './component-pool-properties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyTypesModule } from '../property_types/property_types.module';
import { ComponentPoolModule } from '../component-pool/component-pool.module';
import { ComponentPoolProperties } from '../../entities';

@Module({
	imports: [
		TypeOrmModule.forFeature([ComponentPoolProperties])
		,PropertyTypesModule
		,ComponentPoolModule
	],
  controllers: [ComponentPoolPropertiesController],
  providers: [ComponentPoolPropertiesService],
	exports: [ComponentPoolPropertiesService],
})
export class ComponentPoolPropertiesModule {}
