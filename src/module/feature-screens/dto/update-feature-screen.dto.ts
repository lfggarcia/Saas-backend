import { PartialType } from '@nestjs/mapped-types';
import { CreateFeatureScreenDto } from './create-feature-screen.dto';

export class UpdateFeatureScreenDto extends PartialType(CreateFeatureScreenDto) {}
