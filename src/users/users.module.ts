import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Application } from '../entities/application.entity';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Application, User])],  // Registramos las entidades
  providers: [UsersService],  // Incluimos el servicio
  controllers: [UsersController],  // Incluimos el controlador
})
export class UsersModule {}
