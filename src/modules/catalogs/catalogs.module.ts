import { Module } from '@nestjs/common';
import { AliasesService } from './aliases/aliases.service';
import { AliasesController } from './aliases/aliases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aliases, ComponentTypes, DefaultTokens, FieldTypes, TokenGroups } from '../../entities';
import { TokenGroupsService } from './token-groups/token-groups.service';
import { TokenGroupsController } from './token-groups/token-groups.controller';
import { DefaultTokensService } from './default-tokens/default-tokens.service';
import { DefaultTokensController } from './default-tokens/default-tokens.controller';
import { ComponentTypesController } from './component-types/component-types.controller';
import { ComponentTypesService } from './component-types/component-types.service';
import { FieldTypesService } from './field-types/field-types.service';
import { FieldTypesController } from './field-types/field-types.controller';

@Module({
	imports: [TypeOrmModule.forFeature([
		Aliases,
		TokenGroups,
		DefaultTokens,
		ComponentTypes,
		FieldTypes
	])],
  providers: [
		AliasesService,
		TokenGroupsService,
		DefaultTokensService,
		ComponentTypesService,
		FieldTypesService
	],
  controllers: [
		AliasesController,
		TokenGroupsController,
		DefaultTokensController,
		ComponentTypesController,
		FieldTypesController
	]
})
export class CatalogsModule {}
