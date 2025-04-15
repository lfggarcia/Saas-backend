import { Module } from '@nestjs/common';
import { NavigationTypesService } from './navigation-types.service';
import { NavigationTypesController } from './navigation-types.controller';

@Module({
  controllers: [NavigationTypesController],
  providers: [NavigationTypesService],
})
export class NavigationTypesModule {}
