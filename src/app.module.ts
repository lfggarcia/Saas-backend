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
    ScreenVersionsModule
	],
  controllers: [AppController, ThemesController, ScreenComponentsController],
  providers: [AppService, ThemesService, ScreenComponentsService],
})
export class AppModule {}
