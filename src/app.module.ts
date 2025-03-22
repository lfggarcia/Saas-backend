import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ModulesModule } from './module/modules/modules.module';
import * as entities from './entities/entities';

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
      	synchronize: true,
        entities: Object.values(entities),
      }),
      inject: [
				ConfigService
			],
    }),
		ModulesModule
  ],
})
export class AppModule {}
