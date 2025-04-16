import { Module } from '@nestjs/common';
import { TranslationKeysService } from './translation-keys.service';
import { TranslationKeysController } from './translation-keys.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslationKeys } from '../../entities';
import { UsersModule } from '../users/users.module';

@Module({
	imports: [TypeOrmModule.forFeature([TranslationKeys]), UsersModule],
  controllers: [TranslationKeysController],
  providers: [TranslationKeysService],
	exports: [TranslationKeysService]
})
export class TranslationKeysModule {}
