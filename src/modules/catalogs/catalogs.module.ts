import { Module } from '@nestjs/common';
import { AliasesService } from './aliases/aliases.service';
import { AliasesController } from './aliases/aliases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aliases, DefaultTokens, TokenGroups } from '../../entities';
import { TokenGroupsService } from './token-groups/token-groups.service';
import { TokenGroupsController } from './token-groups/token-groups.controller';
import { DefaultTokensService } from './default-tokens/default-tokens.service';
import { DefaultTokensController } from './default-tokens/default-tokens.controller';

@Module({
	imports: [TypeOrmModule.forFeature([
		Aliases,
		TokenGroups,
		DefaultTokens
	])],
  providers: [
		AliasesService,
		TokenGroupsService,
		DefaultTokensService
	],
  controllers: [
		AliasesController,
		TokenGroupsController,
		DefaultTokensController
	]
})
export class CatalogsModule {}
