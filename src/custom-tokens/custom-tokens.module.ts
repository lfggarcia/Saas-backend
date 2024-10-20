import { Module } from '@nestjs/common';
import { CustomTokensService } from './custom-tokens.service';

@Module({
  providers: [CustomTokensService]
})
export class CustomTokensModule {}
