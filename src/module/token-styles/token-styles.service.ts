import { Injectable } from '@nestjs/common';
import { CreateTokenStyleDto } from './dto/create-token-style.dto';
import { UpdateTokenStyleDto } from './dto/update-token-style.dto';

@Injectable()
export class TokenStylesService {
  create(createTokenStyleDto: CreateTokenStyleDto) {
    return 'This action adds a new tokenStyle';
  }

  findAll() {
    return `This action returns all tokenStyles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tokenStyle`;
  }

  update(id: number, updateTokenStyleDto: UpdateTokenStyleDto) {
    return `This action updates a #${id} tokenStyle`;
  }

  remove(id: number) {
    return `This action removes a #${id} tokenStyle`;
  }
}
