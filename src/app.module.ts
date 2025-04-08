import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StyleAliasesModule } from './module/style-aliases/style-aliases.module';
import { TokenDefinitionsModule } from './module/token-definitions/token-definitions.module';
import * as entities from './entities';

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
      	synchronize: false,
        entities: Object.values(entities),
      }),
      inject: [
				ConfigService
			],
    }),
		StyleAliasesModule,
		TokenDefinitionsModule
  ],
})
export class AppModule {}
