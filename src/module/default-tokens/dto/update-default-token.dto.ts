import { PartialType } from '@nestjs/mapped-types';
import { CreateDefaultTokenDto } from './create-default-token.dto';

export class UpdateDefaultTokenDto extends PartialType(CreateDefaultTokenDto) {}
