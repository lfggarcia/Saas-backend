import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { Plan } from './entities/plan.entity';
import { Application } from './entities/application.entity';
import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FeaturesModule } from './features/features.module';
import { ScreensModule } from './screens/screens.module';
import { PlansModule } from './plans/plans.module';
import { LanguagesModule } from './languages/languages.module';
import { TranslationsModule } from './translations/translations.module';
import { GlobalComponentsModule } from './global-components/global-components.module';
import { ScreenComponentsModule } from './screen-components/screen-components.module';
import { ThemesModule } from './themes/themes.module';
import { ThemeTokensModule } from './theme-tokens/theme-tokens.module';
import { CustomTokensModule } from './custom-tokens/custom-tokens.module';
import { StoresModule } from './stores/stores.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT')),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Plan, Application], // Cargamos las entidades
        synchronize: true,
      }),
    }),
    AdminModule,
    UsersModule,
    AuthModule,
    FeaturesModule,
    ScreensModule,
    PlansModule,
    LanguagesModule,
    TranslationsModule,
    GlobalComponentsModule,
    ScreenComponentsModule,
    ThemesModule,
    ThemeTokensModule,
    CustomTokensModule,
    StoresModule,
  ],
})
export class AppModule {}
