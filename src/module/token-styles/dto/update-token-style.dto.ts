import { PartialType } from '@nestjs/mapped-types';
import { CreateTokenStyleDto } from './create-token-style.dto';

export class UpdateTokenStyleDto extends PartialType(CreateTokenStyleDto) {}
