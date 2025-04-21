import { PartialType } from '@nestjs/mapped-types';
import { CreateUserGlobalStyleDto } from './create-user-global-style.dto';

export class UpdateUserGlobalStyleDto extends PartialType(CreateUserGlobalStyleDto) {}
