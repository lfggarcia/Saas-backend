import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { Role } from '../catalogs/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,Role]),
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: process.env.JWT_SECRET || 'default_secret',
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [UsersService, AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [UsersService, AuthService],
})
export class AuthModule {}
