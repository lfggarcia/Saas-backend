import { PartialType } from '@nestjs/mapped-types';
import { CreateTokenDefinitionDto } from './create-token-definition.dto';

export class UpdateTokenDefinitionDto extends PartialType(CreateTokenDefinitionDto) {}
