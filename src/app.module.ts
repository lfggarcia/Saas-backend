import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApplicationsModule } from './module/applications/applications.module';
import { TokenCategoriesModule } from './module/token-categories/token-categories.module';
import { DefaultTokensModule } from './module/default-tokens/default-tokens.module';
import { AppTokensModule } from './module/app-tokens/app-tokens.module';
import { PropertyAliasesModule } from './module/property-aliases/property-aliases.module';
import { StyleVariantsModule } from './module/style-variants/style-variants.module';
import { StyleVariantPropertiesModule } from './module/style-variant-properties/style-variant-properties.module';
import { AppStyleVariantsModule } from './module/app-style-variants/app-style-variants.module';
import { AppStyleVariantPropertiesModule } from './module/app-style-variant-properties/app-style-variant-properties.module';
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
		ApplicationsModule,
		TokenCategoriesModule,
		DefaultTokensModule,
		AppTokensModule,
		PropertyAliasesModule,
		StyleVariantsModule,
		StyleVariantPropertiesModule,
		AppStyleVariantsModule,
		AppStyleVariantPropertiesModule
  ],
})
export class AppModule {}
