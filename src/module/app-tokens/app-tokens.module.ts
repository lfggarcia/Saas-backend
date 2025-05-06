import { Module } from '@nestjs/common';
import { AppTokensService } from './app-tokens.service';
import { AppTokensController } from './app-tokens.controller';

@Module({
  controllers: [AppTokensController],
  providers: [AppTokensService],
})
export class AppTokensModule {}
