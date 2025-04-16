import { Module } from '@nestjs/common';
import { TranslationKeysService } from './translation-keys.service';
import { TranslationKeysController } from './translation-keys.controller';

@Module({
  controllers: [TranslationKeysController],
  providers: [TranslationKeysService],
})
export class TranslationKeysModule {}
