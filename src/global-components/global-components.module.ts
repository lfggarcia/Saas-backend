import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GlobalComponentsService } from './global-components.service';
import { GlobalComponentsController } from './global-components.controller';
import { GlobalComponent } from './entities/global-component.entity';
import { ComponentType } from '../catalogs/entities/component-type.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GlobalComponent, ComponentType, User])],
  providers: [GlobalComponentsService],
  controllers: [GlobalComponentsController],
})
export class GlobalComponentsModule {}
