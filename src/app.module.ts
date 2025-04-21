import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StyleAliasesModule } from './module/style-aliases/style-aliases.module';
import { TokenDefinitionsModule } from './module/token-definitions/token-definitions.module';
import { TokenCategoriesModule } from './module/token-categories/token-categories.module';
import { GlobalStyleVariantTypesModule } from './module/global-style-variant-types/global-style-variant-types.module';
import { PermissionTypeCatalogModule } from './module/permission_type_catalog/permission_type_catalog.module';
import { PropertyTypesModule } from './module/property_types/property_types.module';
import { ComponentTypesModule } from './module/component_types/component_types.module';
import { CollaboratorRolesModule } from './module/collaborator-roles/collaborator-roles.module';
import { RolesModule } from './module/roles/roles.module';
import { UserStatusCatalogModule } from './module/user-status-catalog/user-status-catalog.module';
import { NavigationTypesModule } from './module/navigation-types/navigation-types.module';
import { ScreensModule } from './module/screens/screens.module';
import { UserLanguagesModule } from './module/user-languages/user-languages.module';
import { UsersModule } from './module/users/users.module';
import { AppsModule } from './module/apps/apps.module';
import { NavigationsModule } from './module/navigations/navigations.module';
import { FeaturesModule } from './module/features/features.module';
import { ComponentPoolModule } from './module/component-pool/component-pool.module';
import { ScreenComponentsModule } from './module/screen-components/screen-components.module';
import { ScreenComponentOverridesModule } from './module/screen-component-overrides/screen-component-overrides.module';
import { TranslationKeysModule } from './module/translation-keys/translation-keys.module';
import { PermissionsModule } from './module/permissions/permissions.module';
import { ScreenVersionsModule } from './module/screen-versions/screen-versions.module';
import { UserTranslationsModule } from './module/user-translations/user-translations.module';
import { UserThemesModule } from './module/user-themes/user-themes.module';
import { UserTokensModule } from './module/user-tokens/user-tokens.module';
import * as entities from './entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
		TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        type: 'postgres',
				url: process.env.DATABASE_URL,
      	autoLoadEntities: true,
      	synchronize: false,
        entities: Object.values(entities),
      }),
      inject: [
				ConfigService
			],
    }),
		StyleAliasesModule,
		TokenDefinitionsModule,
		TokenCategoriesModule,
		GlobalStyleVariantTypesModule,
		PermissionTypeCatalogModule,
		PropertyTypesModule,
		ComponentTypesModule,
		CollaboratorRolesModule,
		RolesModule,
		UserStatusCatalogModule,
		NavigationTypesModule,
		ScreensModule,
		UserLanguagesModule,
		UsersModule,
		AppsModule,
		NavigationsModule,
		FeaturesModule,
		ComponentPoolModule,
		ScreenComponentsModule,
		ScreenComponentOverridesModule,
		TranslationKeysModule,
		PermissionsModule,
		ScreenVersionsModule,
		UserTranslationsModule,
		UserThemesModule,
		UserTokensModule
  ],
})
export class AppModule {}
