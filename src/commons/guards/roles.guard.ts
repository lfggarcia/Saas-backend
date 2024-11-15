import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<{ role: string; permissions: number[] }>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role !== requiredRoles.role) {
      throw new ForbiddenException('No tienes el rol necesario para acceder a esta ruta.');
    }

    const [canView, canEdit, canDelete] = requiredRoles.permissions;
    const { canView: userCanView, canEdit: userCanEdit, canDelete: userCanDelete } = user.permissions;

    if ((canView && !userCanView) || (canEdit && !userCanEdit) || (canDelete && !userCanDelete)) {
      throw new ForbiddenException('No tienes los permisos necesarios para acceder a esta ruta.');
    }

    return true;
  }
}
