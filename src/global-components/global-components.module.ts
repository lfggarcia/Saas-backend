import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GlobalComponentsService } from './global-components.service';
import { GlobalComponentsController } from './global-components.controller';
import { GlobalComponent } from './entities/global-component.entity';
import { ComponentType } from '../catalogs/entities/component-type.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([GlobalComponent, ComponentType]), AuthModule],
  providers: [GlobalComponentsService],
  controllers: [GlobalComponentsController],
})
export class GlobalComponentsModule {}
