import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomTokensService } from './custom-tokens.service';
import { CustomTokensController } from './custom-tokens.controller';
import { CustomToken } from './entities/custom-token.entity';
import { Theme } from '../themes/entities/theme.entity';
import { User } from '../users/entities/user.entity';
import { TokenGroup } from '../catalogs/entities/token-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomToken, Theme, User, TokenGroup])],
  providers: [CustomTokensService],
  controllers: [CustomTokensController],
})
export class CustomTokensModule {}
