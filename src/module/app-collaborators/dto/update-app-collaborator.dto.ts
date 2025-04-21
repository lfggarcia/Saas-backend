import { PartialType } from '@nestjs/mapped-types';
import { CreateAppCollaboratorDto } from './create-app-collaborator.dto';

export class UpdateAppCollaboratorDto extends PartialType(CreateAppCollaboratorDto) {}
