import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

@Module({
  providers: [UsersService, AuthService]
})
export class AuthModule {}
