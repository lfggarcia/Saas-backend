import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogsModule } from './catalogs/catalogs.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppsModule } from './apps/apps.module';
import { FeaturesModule } from './features/features.module';
import { ScreensModule } from './screens/screens.module';
import { ComponentsModule } from './components/components.module';
import { ThemesService } from './themes/themes.service';
import { ThemesController } from './themes/themes.controller';
import { ThemesModule } from './themes/themes.module';
import { ThemeTokensModule } from './theme-tokens/theme-tokens.module';
import { CustomTokensModule } from './custom-tokens/custom-tokens.module';
import { GlobalComponentsModule } from './global-components/global-components.module';
import { ScreenComponentsService } from './screen-components/screen-components.service';
import { ScreenComponentsController } from './screen-components/screen-components.controller';
import { ScreenComponentsModule } from './screen-components/screen-components.module';
import { FeatureVersionsModule } from './feature-versions/feature-versions.module';
import { ScreenVersionsModule } from './screen-versions/screen-versions.module';
import { I18nModule } from './i18n/i18n.module';
import { FormFieldsModule } from './form-fields/form-fields.module';
import { FormFieldValidationsModule } from './form-field-validations/form-field-validations.module';
import { StoresService } from './stores/stores.service';
import { ReducersService } from './reducers/reducers.service';
import { ReducerActionsService } from './reducer-actions/reducer-actions.service';
import { ReducersController } from './reducers/reducers.controller';
import { ReducerActionsController } from './reducer-actions/reducer-actions.controller';
import { ReducersModule } from './reducers/reducers.module';
import { ReducerActionsModule } from './reducer-actions/reducer-actions.module';
import { StoresModule } from './stores/stores.module';
import { GlobalStylesService } from './global-styles/global-styles.service';
import { GlobalStyleVariantsService } from './global-style-variants/global-style-variants.service';
import { GlobalStylesController } from './global-styles/global-styles.controller';
import { GlobalStyleVariantsController } from './global-style-variants/global-style-variants.controller';
import { GlobalStylesModule } from './global-styles/global-styles.module';
import { GlobalStyleVariantsModule } from './global-style-variants/global-style-variants.module';

@Module({
  imports: [
		ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
      	port: parseInt(process.env.DB_PORT),
      	username: process.env.DB_USERNAME,
      	password: process.env.DB_PASSWORD,
      	database: process.env.DB_NAME,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    CatalogsModule,
    AuthModule,
    UsersModule,
    AppsModule,
    FeaturesModule,
    ScreensModule,
    ComponentsModule,
    ThemesModule,
    ThemeTokensModule,
    CustomTokensModule,
    GlobalComponentsModule,
    ScreenComponentsModule,
    FeatureVersionsModule,
    ScreenVersionsModule,
    I18nModule,
    FormFieldsModule,
    FormFieldValidationsModule,
    ReducersModule,
    ReducerActionsModule,
    StoresModule,
    GlobalStylesModule,
    GlobalStyleVariantsModule,
	],
  controllers: [AppController, ThemesController, ScreenComponentsController, ReducersController, ReducerActionsController, GlobalStylesController, GlobalStyleVariantsController],
  providers: [AppService, ThemesService, ScreenComponentsService, StoresService, ReducersService, ReducerActionsService, GlobalStylesService, GlobalStyleVariantsService],
})
export class AppModule {}
