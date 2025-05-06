import { Module } from '@nestjs/common';
import { StyleVariantsService } from './style-variants.service';
import { StyleVariantsController } from './style-variants.controller';

@Module({
  controllers: [StyleVariantsController],
  providers: [StyleVariantsService],
})
export class StyleVariantsModule {}
