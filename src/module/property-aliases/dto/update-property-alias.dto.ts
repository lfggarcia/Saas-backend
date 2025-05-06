import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyAliasDto } from './create-property-alias.dto';

export class UpdatePropertyAliasDto extends PartialType(CreatePropertyAliasDto) {}
