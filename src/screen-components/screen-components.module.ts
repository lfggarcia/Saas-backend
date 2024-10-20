import { Module } from '@nestjs/common';
import { ScreenComponentsService } from './screen-components.service';

@Module({
  providers: [ScreenComponentsService]
})
export class ScreenComponentsModule {}
