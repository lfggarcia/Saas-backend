import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GlobalComponentsService } from './global-components.service';
import { GlobalComponentsController } from './global-components.controller';
import { GlobalComponent } from './entities/global-component.entity';
import { App } from '../apps/entities/app.entity';
import { ComponentType } from '../catalogs/entities/component-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GlobalComponent, App, ComponentType])],
  providers: [GlobalComponentsService],
  controllers: [GlobalComponentsController],
})
export class GlobalComponentsModule {}
