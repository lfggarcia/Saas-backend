import { Module } from '@nestjs/common';
import { ComponentTypesService } from './component_types.service';
import { ComponentTypesController } from './component_types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentTypes } from '../../entities';

@Module({
	imports: [TypeOrmModule.forFeature([ComponentTypes])],
  controllers: [ComponentTypesController],
  providers: [ComponentTypesService],
	exports: [ComponentTypesService],
})
export class ComponentTypesModule {}
