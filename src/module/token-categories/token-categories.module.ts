import { Module } from '@nestjs/common';
import { TokenCategoriesService } from './token-categories.service';
import { TokenCategoriesController } from './token-categories.controller';

@Module({
  controllers: [TokenCategoriesController],
  providers: [TokenCategoriesService],
})
export class TokenCategoriesModule {}
