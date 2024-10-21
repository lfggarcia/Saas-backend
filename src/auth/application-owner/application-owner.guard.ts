import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ApplicationOwnerGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly usersService: UsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const appId = request.params.appId;

    const application = await this.usersService.getAppById(appId);

    if (!application) {
      throw new ForbiddenException('Application not found.');
    }

    if (application.user.id === user.id || user.role === 'superadmin') {
      return true;
    }

    throw new ForbiddenException('You do not have permission to manage this application.');
  }
}
