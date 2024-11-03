import { Module } from '@nestjs/common';
import { ComponentsService } from './components.service';

@Module({
  providers: [ComponentsService]
})
export class ComponentsModule {}
