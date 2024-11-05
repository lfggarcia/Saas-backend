import { Module } from '@nestjs/common';
import { ThemeTokensService } from './theme-tokens.service';
import { ThemeTokensController } from './theme-tokens.controller';

@Module({
  providers: [ThemeTokensService],
  controllers: [ThemeTokensController]
})
export class ThemeTokensModule {}
