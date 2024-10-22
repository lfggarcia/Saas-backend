// src/catalogs/catalogs.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alias } from './entities/alias.entity/alias.entity';
import { TokenGroup } from './entities/token-group.entity/token-group.entity';
import { TokenGroupAlias } from './entities/token-group-alias.entity/token-group-alias.entity';
import { DefaultToken } from './entities/default-token.entity/default-token.entity';
import { ComponentType } from './entities/component-type.entity/component-type.entity';
import { FieldType } from './entities/field-type.entity/field-type.entity';
import { ValidationType } from './entities/validation-type.entity/validation-type.entity';
import { Status } from './entities/status.entity/status.entity';
import { Role } from './entities/role.entity/role.entity';
import { Plan } from './entities/plan.entity/plan.entity';
import { CatalogsController } from './catalogs/catalogs.controller';
import { CatalogsController } from './catalogs.controller';
import { CatalogsService } from './catalogs.service';

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
  controllers: [CatalogsController],
  providers: [CatalogsService],
  exports: [],
})
export class CatalogsModule {}
