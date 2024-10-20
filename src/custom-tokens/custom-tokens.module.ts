import { Module } from '@nestjs/common';
import { CustomTokensService } from './custom-tokens.service';
import { CustomTokensController } from './custom-tokens.controller';

@Module({
  providers: [CustomTokensService],
  controllers: [CustomTokensController]
})
export class CustomTokensModule {}
