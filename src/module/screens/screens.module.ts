import { Module } from '@nestjs/common';
import { ScreensService } from './screens.service';
import { ScreensController } from './screens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Screens } from '../../entities';

@Module({
	imports: [TypeOrmModule.forFeature([Screens])],
  controllers: [ScreensController],
  providers: [ScreensService],
	exports: [ScreensService],
})
export class ScreensModule {}
