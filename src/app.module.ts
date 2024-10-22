import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogsModule } from './catalogs/catalogs.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
		TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost,
      port: process.env.DB_PORT || 5432,
      username: process.env.DB_USERNAME || 'user', // Cambia esto si es necesario
      password: process.env.DB_PASSWORD || 'pass', // Cambia esto si es necesario
      database: process.env.DB_NAME || 'db', // Cambia esto si es necesario
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // No usar en producción
    }),
		CatalogsModule
	],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
