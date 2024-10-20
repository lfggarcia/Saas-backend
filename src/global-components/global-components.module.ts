import { Module } from '@nestjs/common';
import { GlobalComponentsService } from './global-components.service';

@Module({
  providers: [GlobalComponentsService]
})
export class GlobalComponentsModule {}
