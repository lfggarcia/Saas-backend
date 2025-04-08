import { Module } from '@nestjs/common';
import { TokenCategoriesService } from './token-categories.service';
import { TokenCategoriesController } from './token-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenCategories } from '../../entities';

@Module({
	imports: [TypeOrmModule.forFeature([TokenCategories])],
  controllers: [TokenCategoriesController],
  providers: [TokenCategoriesService],
})
export class TokenCategoriesModule {}
