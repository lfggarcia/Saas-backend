import { Module } from '@nestjs/common';
import { ScreenVersionsService } from './screen-versions.service';
import { ScreenVersionsController } from './screen-versions.controller';

@Module({
  providers: [ScreenVersionsService],
  controllers: [ScreenVersionsController]
})
export class ScreenVersionsModule {}
