import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
		ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de entorno estén disponibles en toda la app
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: Number(process.env.POSTGRES_PORT) || 5432,
      username: process.env.POSTGRES_USER || 'conta_admin',
      password: process.env.POSTGRES_PASSWORD || 'conta_pass_segura',
      database: process.env.POSTGRES_DB || 'contabilidad_db',
      autoLoadEntities: true, // Carga automáticamente las entidades
      synchronize: true, // Solo para desarrollo (cambia en producción)
    }),
    UsersModule,
	]
})
export class AppModule {}
