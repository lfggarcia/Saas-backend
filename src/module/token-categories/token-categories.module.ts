import { Module } from '@nestjs/common';
import { TokenCategoriesService } from './token-categories.service';
import { TokenCategoriesController } from './token-categories.controller';
import { TokenCategories } from '../../entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([TokenCategories])],
  controllers: [TokenCategoriesController],
  providers: [TokenCategoriesService],
	exports: [TokenCategoriesService],
})
export class TokenCategoriesModule {}
