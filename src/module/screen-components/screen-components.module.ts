import { Module } from '@nestjs/common';
import { ScreenComponentsService } from './screen-components.service';
import { ScreenComponentsController } from './screen-components.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreenComponents } from '../../entities';
import { ComponentPoolModule } from '../component-pool/component-pool.module';
import { ScreensModule } from '../screens/screens.module';

@Module({
	imports: [TypeOrmModule.forFeature([ScreenComponents]), ComponentPoolModule,ScreensModule],
  controllers: [ScreenComponentsController],
  providers: [ScreenComponentsService],
	exports: [ScreenComponentsService],
})
export class ScreenComponentsModule {}
