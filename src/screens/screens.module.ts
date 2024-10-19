import { Module } from '@nestjs/common';
import { ScreensService } from './screens.service';

@Module({
  providers: [ScreensService]
})
export class ScreensModule {}
