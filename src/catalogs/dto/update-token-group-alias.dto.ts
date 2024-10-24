import { PartialType } from '@nestjs/mapped-types';
import { CreateTokenGroupAliasDto } from './create-token-group-alias.dto';

export class UpdateTokenGroupAliasDto extends PartialType(CreateTokenGroupAliasDto) {}
