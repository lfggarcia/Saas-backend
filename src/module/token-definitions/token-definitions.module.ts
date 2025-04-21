import { Module } from '@nestjs/common';
import { TokenDefinitionsService } from './token-definitions.service';
import { TokenDefinitionsController } from './token-definitions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenDefinitions } from '../../entities';

@Module({
	imports: [TypeOrmModule.forFeature([TokenDefinitions])],
  controllers: [TokenDefinitionsController],
  providers: [TokenDefinitionsService],
	exports: [TokenDefinitionsService]
})
export class TokenDefinitionsModule {}
