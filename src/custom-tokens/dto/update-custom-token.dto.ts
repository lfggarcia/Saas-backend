import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomTokenDto } from './create-custom-token.dto';

export class UpdateCustomTokenDto extends PartialType(CreateCustomTokenDto) {
	tokenGroup?: { id?: string; };
}
