import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogsModule } from './catalogs/catalogs.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
		ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Configuración de TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: process.env.DB_HOST,
      	port: parseInt(process.env.DB_PORT),
      	username: process.env.DB_USERNAME,
      	password: process.env.DB_PASSWORD,
      	database: process.env.DB_NAME,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
				// entities:[],
        synchronize: false, // Usar solo en desarrollo
      }),
      inject: [ConfigService],
    }),
    CatalogsModule,
    AuthModule
	],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
