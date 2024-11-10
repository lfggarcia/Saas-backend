import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'
import AppModules from "./modules"
import AppController from './controller'
import appProviders from './app.providers';
import appEntities from './app.entities';

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
        entities: appEntities,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    ...AppModules
	],
  controllers: AppController,
  providers: appProviders,
})
export class AppModule {}
