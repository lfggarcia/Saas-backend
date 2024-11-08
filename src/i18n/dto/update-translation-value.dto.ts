import { PartialType } from '@nestjs/mapped-types';
import { CreateTranslationValueDto } from './create-translation-value.dto';

export class UpdateTranslationValueDto extends PartialType(CreateTranslationValueDto) {}
