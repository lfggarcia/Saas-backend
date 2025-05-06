import { Module } from '@nestjs/common';
import { AppStyleVariantPropertiesService } from './app-style-variant-properties.service';
import { AppStyleVariantPropertiesController } from './app-style-variant-properties.controller';

@Module({
  controllers: [AppStyleVariantPropertiesController],
  providers: [AppStyleVariantPropertiesService],
})
export class AppStyleVariantPropertiesModule {}
