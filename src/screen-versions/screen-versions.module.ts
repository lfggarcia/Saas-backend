import { Module } from '@nestjs/common';
import { ScreenVersionsService } from './screen-versions.service';

@Module({
  providers: [ScreenVersionsService]
})
export class ScreenVersionsModule {}
