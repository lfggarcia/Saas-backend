import { PartialType } from '@nestjs/mapped-types';
import { CreateTokenCategoryDto } from './create-token-category.dto';

export class UpdateTokenCategoryDto extends PartialType(CreateTokenCategoryDto) {}
