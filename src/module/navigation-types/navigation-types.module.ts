import { Module } from '@nestjs/common';
import { NavigationTypesService } from './navigation-types.service';
import { NavigationTypesController } from './navigation-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NavigationTypes } from '../../entities';

@Module({
	imports: [TypeOrmModule.forFeature([NavigationTypes])],
  controllers: [NavigationTypesController],
  providers: [NavigationTypesService],
})
export class NavigationTypesModule {}
