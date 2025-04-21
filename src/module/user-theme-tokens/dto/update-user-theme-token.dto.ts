import { PartialType } from '@nestjs/mapped-types';
import { CreateUserThemeTokenDto } from './create-user-theme-token.dto';

export class UpdateUserThemeTokenDto extends PartialType(CreateUserThemeTokenDto) {}
