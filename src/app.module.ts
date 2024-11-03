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
    ComponentsModule
	],
  controllers: [AppController, ThemesController],
  providers: [AppService, ThemesService],
})
export class AppModule {}
