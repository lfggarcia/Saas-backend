import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ComponentsService } from './components.service';
import { ComponentsController } from './components.controller';
import { Component } from './entities/component.entity';
import { ComponentProperty } from './entities/component-property.entity';
import { Screen } from '../screens/entities/screen.entity';
import { ComponentType } from '../catalogs/entities/component-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Component,
      ComponentProperty,
      Screen,
      ComponentType,
    ]),
  ],
  providers: [ComponentsService],
  controllers: [ComponentsController],
})
export class ComponentsModule {}
