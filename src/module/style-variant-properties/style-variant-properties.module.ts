import { Module } from '@nestjs/common';
import { StyleVariantPropertiesService } from './style-variant-properties.service';
import { StyleVariantPropertiesController } from './style-variant-properties.controller';

@Module({
  controllers: [StyleVariantPropertiesController],
  providers: [StyleVariantPropertiesService],
})
export class StyleVariantPropertiesModule {}
