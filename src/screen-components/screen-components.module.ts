import { Module } from '@nestjs/common';
import { ScreenComponentsService } from './screen-components.service';
import { ScreenComponentsController } from './screen-components.controller';

@Module({
  providers: [ScreenComponentsService],
  controllers: [ScreenComponentsController]
})
export class ScreenComponentsModule {}
