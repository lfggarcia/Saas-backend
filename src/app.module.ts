import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TestModule } from './test/test.module';
import * as entities from './entities';
import { AuthModule } from './modules/auth/auth.module';
import { CatalogsModule } from './modules/catalogs/catalogs.module';
import { ApplicationsModule } from './modules/applications/applications.module';
import { ThemesModule } from './modules/themes/themes.module';

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
        entities: Object.values(entities),
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    TestModule,
		AuthModule,
		CatalogsModule,
		ApplicationsModule,
		ThemesModule
  ],
})
export class AppModule {}
