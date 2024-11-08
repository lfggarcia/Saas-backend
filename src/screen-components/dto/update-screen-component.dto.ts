import { PartialType } from '@nestjs/mapped-types';
import { CreateScreenComponentDto } from './create-screen-component.dto';

export class UpdateScreenComponentDto extends PartialType(CreateScreenComponentDto) {}
