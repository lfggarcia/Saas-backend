import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ThemeTokensService } from './theme-tokens.service';
import { ThemeTokensController } from './theme-tokens.controller';
import { ThemeToken } from './entities/theme-token.entity';
import { Theme } from '../themes/entities/theme.entity';
import { TokenGroup } from '../catalogs/entities/token-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ThemeToken, Theme, TokenGroup])],
  providers: [ThemeTokensService],
  controllers: [ThemeTokensController],
})
export class ThemeTokensModule {}
