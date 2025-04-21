import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAliasDto } from './create-user-alias.dto';

export class UpdateUserAliasDto extends PartialType(CreateUserAliasDto) {}
