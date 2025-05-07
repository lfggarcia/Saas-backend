import { Module } from '@nestjs/common';
import { TokenStylesService } from './token-styles.service';
import { TokenStylesController } from './token-styles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenStyles } from '../../entities';

@Module({
	imports: [TypeOrmModule.forFeature([TokenStyles])],
  controllers: [TokenStylesController],
  providers: [TokenStylesService],
	exports: [TokenStylesService],
})
export class TokenStylesModule {}
