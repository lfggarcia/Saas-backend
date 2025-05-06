import { Injectable } from '@nestjs/common';
import { CreateDefaultTokenDto } from './dto/create-default-token.dto';
import { UpdateDefaultTokenDto } from './dto/update-default-token.dto';

@Injectable()
export class DefaultTokensService {
  create(createDefaultTokenDto: CreateDefaultTokenDto) {
    return 'This action adds a new defaultToken';
  }

  findAll() {
    return `This action returns all defaultTokens`;
  }

  findOne(id: number) {
    return `This action returns a #${id} defaultToken`;
  }

  update(id: number, updateDefaultTokenDto: UpdateDefaultTokenDto) {
    return `This action updates a #${id} defaultToken`;
  }

  remove(id: number) {
    return `This action removes a #${id} defaultToken`;
  }
}
