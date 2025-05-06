import { Module } from '@nestjs/common';
import { DefaultTokensService } from './default-tokens.service';
import { DefaultTokensController } from './default-tokens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultTokens } from '../../entities';
import { TokenCategoriesService } from '../token-categories/token-categories.service';
import { TokenCategoriesModule } from '../token-categories/token-categories.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([DefaultTokens]),
		TokenCategoriesModule
	],
  controllers: [DefaultTokensController],
  providers: [DefaultTokensService],
	exports: [DefaultTokensService],
})
export class DefaultTokensModule {}
