import { PartialType } from '@nestjs/mapped-types';
import { CreateUserThemeDto } from './create-user-theme.dto';

export class UpdateUserThemeDto extends PartialType(CreateUserThemeDto) {}
