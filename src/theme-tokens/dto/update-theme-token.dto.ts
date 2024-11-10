import { PartialType } from '@nestjs/mapped-types';
import { CreateThemeTokenDto } from './create-theme-token.dto';

export class UpdateThemeTokenDto extends PartialType(CreateThemeTokenDto) {
	tokenGroup?: { id: string; };
}
