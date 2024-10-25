import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScreensService } from './screens.service';
import { ScreensController } from './screens.controller';
import { Screen } from './entities/screen.entity';
import { Feature } from '../features/entities/feature.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Screen, Feature])],
  providers: [ScreensService],
  controllers: [ScreensController],
})
export class ScreensModule {}
