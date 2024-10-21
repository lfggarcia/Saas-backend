import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';
import { Observable } from 'rxjs';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private readonly usersService: UsersService, private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;  // Usuario autenticado
    const resourceOwnerId = request.params.userId || request.params.appId || request.params.featureId;  // ID del recurso
    
    // Lógica para validar si el usuario es dueño del recurso
    if (!user || !resourceOwnerId) {
      throw new ForbiddenException('No tienes acceso a este recurso');
    }

    // Ejemplo: Obtener el propietario de la aplicación o feature (puedes extenderlo según las entidades)
    const isOwner = await this.usersService.isOwner(user.id, resourceOwnerId);
    if (!isOwner) {
      throw new ForbiddenException('No tienes acceso a este recurso');
    }

    return true;
  }
}
