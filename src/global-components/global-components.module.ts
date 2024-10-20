import { Module } from '@nestjs/common';
import { GlobalComponentsService } from './global-components.service';
import { GlobalComponentsController } from './global-components.controller';

@Module({
  providers: [GlobalComponentsService],
  controllers: [GlobalComponentsController]
})
export class GlobalComponentsModule {}
