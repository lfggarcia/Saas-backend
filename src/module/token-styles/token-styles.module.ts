import { Module } from '@nestjs/common';
import { TokenStylesService } from './token-styles.service';
import { TokenStylesController } from './token-styles.controller';

@Module({
  controllers: [TokenStylesController],
  providers: [TokenStylesService],
})
export class TokenStylesModule {}
