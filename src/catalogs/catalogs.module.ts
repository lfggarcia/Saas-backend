import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alias } from './entities/alias.entity';
import { TokenGroup } from './entities/token-group.entity';
import { TokenGroupAlias } from './entities/token-group-alias.entity';
import { DefaultToken } from './entities/default-token.entity';
import { ComponentType } from './entities/component-type.entity';
import { FieldType } from './entities/field-type.entity';
import { ValidationType } from './entities/validation-type.entity';
import { Status } from './entities/status.entity';
import { Role } from './entities/role.entity';
import { Plan } from './entities/plan.entity';
import { AliasesService } from './services/aliases.service';
import { AliasesController } from './controllers/aliases.controller';
import { TokenGroupsService } from './services/token-groups.service';
import { TokenGroupsController } from './controllers/token-groups.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Alias,
      TokenGroup,
      TokenGroupAlias,
      DefaultToken,
      ComponentType,
      FieldType,
      ValidationType,
      Status,
      Role,
      Plan,
    ]),
  ],
  controllers: [AliasesController, TokenGroupsController],
  providers: [AliasesService, TokenGroupsService],
  exports: [],
})
export class CatalogsModule {}
