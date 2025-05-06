import { Module } from '@nestjs/common';
import { DefaultTokensService } from './default-tokens.service';
import { DefaultTokensController } from './default-tokens.controller';

@Module({
  controllers: [DefaultTokensController],
  providers: [DefaultTokensService],
})
export class DefaultTokensModule {}
