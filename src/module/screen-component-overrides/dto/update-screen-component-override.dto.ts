import { PartialType } from '@nestjs/mapped-types';
import { CreateScreenComponentOverrideDto } from './create-screen-component-override.dto';

export class UpdateScreenComponentOverrideDto extends PartialType(CreateScreenComponentOverrideDto) {}
