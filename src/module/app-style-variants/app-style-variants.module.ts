import { Module } from '@nestjs/common';
import { AppStyleVariantsService } from './app-style-variants.service';
import { AppStyleVariantsController } from './app-style-variants.controller';

@Module({
  controllers: [AppStyleVariantsController],
  providers: [AppStyleVariantsService],
})
export class AppStyleVariantsModule {}
