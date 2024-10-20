import { Module } from '@nestjs/common';
import { TranslationsService } from './translations.service';

@Module({
  providers: [TranslationsService]
})
export class TranslationsModule {}
