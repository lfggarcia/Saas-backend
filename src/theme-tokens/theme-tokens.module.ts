import { Module } from '@nestjs/common';
import { ThemeTokensService } from './theme-tokens.service';

@Module({
  providers: [ThemeTokensService]
})
export class ThemeTokensModule {}
