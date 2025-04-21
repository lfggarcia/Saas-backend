import { Module } from '@nestjs/common';
import { PropertyTypesService } from './property_types.service';
import { PropertyTypesController } from './property_types.controller';
import { PropertyTypes } from '../../entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([PropertyTypes])],
  controllers: [PropertyTypesController],
  providers: [PropertyTypesService],
	exports: [PropertyTypesService],
})
export class PropertyTypesModule {}
