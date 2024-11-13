import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import * as entities from '../entities/index';

@Module({
  imports: [TypeOrmModule.forFeature([...Object.values(entities)])],
  providers: [TestService],
  controllers: [TestController],
})
export class TestModule {}
