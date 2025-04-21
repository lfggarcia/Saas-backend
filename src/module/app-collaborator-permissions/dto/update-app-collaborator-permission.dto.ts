import { PartialType } from '@nestjs/mapped-types';
import { CreateAppCollaboratorPermissionDto } from './create-app-collaborator-permission.dto';

export class UpdateAppCollaboratorPermissionDto extends PartialType(CreateAppCollaboratorPermissionDto) {}
