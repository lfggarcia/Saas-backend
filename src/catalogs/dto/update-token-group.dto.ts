import { PartialType } from '@nestjs/mapped-types';
import { CreateTokenGroupDto } from './create-token-group.dto';

export class UpdateTokenGroupDto extends PartialType(CreateTokenGroupDto) {}
