import { Module } from '@nestjs/common';
import { UserTokensService } from './user-tokens.service';
import { UserTokensController } from './user-tokens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTokens } from '../../entities';
import { TokenDefinitionsModule } from '../token-definitions/token-definitions.module';
import { UsersModule } from '../users/users.module';
import { TokenCategoriesModule } from '../token-categories/token-categories.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserTokens]),
		TokenDefinitionsModule,
		UsersModule,
		TokenCategoriesModule
	],
  controllers: [UserTokensController],
  providers: [UserTokensService],
	exports: [UserTokensService]
})
export class UserTokensModule {}
