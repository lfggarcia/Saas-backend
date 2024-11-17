import { Module } from '@nestjs/common';
import { AliasesService } from './aliases/aliases.service';
import { AliasesController } from './aliases/aliases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aliases, ComponentTypes, DefaultTokens, FieldTypes, Plans, Roles, Statuses, TokenGroups, ValidationTypes } from '../../entities';
import { TokenGroupsService } from './token-groups/token-groups.service';
import { TokenGroupsController } from './token-groups/token-groups.controller';
import { DefaultTokensService } from './default-tokens/default-tokens.service';
import { DefaultTokensController } from './default-tokens/default-tokens.controller';
import { ComponentTypesController } from './component-types/component-types.controller';
import { ComponentTypesService } from './component-types/component-types.service';
import { FieldTypesService } from './field-types/field-types.service';
import { FieldTypesController } from './field-types/field-types.controller';
import { ValidationTypesController } from './validation-types/validation-types.controller';
import { ValidationTypesService } from './validation-types/validation-types.service';
import { StatusesService } from './statuses/statuses.service';
import { StatusesController } from './statuses/statuses.controller';
import { RolesController } from './roles/roles.controller';
import { RolesService } from './roles/roles.service';
import { PlansService } from './plans/plans.service';
import { PlansController } from './plans/plans.controller';

@Module({
	imports: [TypeOrmModule.forFeature([
		Aliases
		,TokenGroups
		,DefaultTokens
		,ComponentTypes
		,FieldTypes
		,ValidationTypes
		,Statuses
		,Roles
		,Plans
	])],
  providers: [
		AliasesService,
		TokenGroupsService,
		DefaultTokensService,
		ComponentTypesService,
		FieldTypesService,
		ValidationTypesService,
		StatusesService,
		RolesService,
		PlansService
	],
  controllers: [
		AliasesController,
		TokenGroupsController,
		DefaultTokensController,
		ComponentTypesController,
		FieldTypesController,
		ValidationTypesController,
		StatusesController,
		RolesController,
		PlansController
	]
})
export class CatalogsModule {}
