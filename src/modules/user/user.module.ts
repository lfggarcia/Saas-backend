import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {Users,Roles} from "../../entities"
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([Users,Roles])],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
