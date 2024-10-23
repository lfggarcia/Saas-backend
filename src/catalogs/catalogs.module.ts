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
  controllers: [],
  providers: [],
  exports: [],
})
export class CatalogsModule {}
