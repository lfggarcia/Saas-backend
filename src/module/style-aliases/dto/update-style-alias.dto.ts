import { PartialType } from '@nestjs/mapped-types';
import { CreateStyleAliasDto } from './create-style-alias.dto';

export class UpdateStyleAliasDto extends PartialType(CreateStyleAliasDto) {}
