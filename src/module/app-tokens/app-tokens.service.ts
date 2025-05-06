import { Injectable } from '@nestjs/common';
import { CreateAppTokenDto } from './dto/create-app-token.dto';
import { UpdateAppTokenDto } from './dto/update-app-token.dto';

@Injectable()
export class AppTokensService {
  create(createAppTokenDto: CreateAppTokenDto) {
    return 'This action adds a new appToken';
  }

  findAll() {
    return `This action returns all appTokens`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appToken`;
  }

  update(id: number, updateAppTokenDto: UpdateAppTokenDto) {
    return `This action updates a #${id} appToken`;
  }

  remove(id: number) {
    return `This action removes a #${id} appToken`;
  }
}
