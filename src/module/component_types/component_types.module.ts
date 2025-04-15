import { Module } from '@nestjs/common';
import { ComponentTypesService } from './component_types.service';
import { ComponentTypesController } from './component_types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([ComponentTypesService])],
  controllers: [ComponentTypesController],
  providers: [ComponentTypesService],
})
export class ComponentTypesModule {}
