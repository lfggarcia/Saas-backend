import { PartialType } from '@nestjs/mapped-types';
import { CreateUserTranslationDto } from './create-user-translation.dto';

export class UpdateUserTranslationDto extends PartialType(CreateUserTranslationDto) {}
