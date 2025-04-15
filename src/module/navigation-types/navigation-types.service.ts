import { Injectable } from '@nestjs/common';
import { CreateNavigationTypeDto } from './dto/create-navigation-type.dto';
import { UpdateNavigationTypeDto } from './dto/update-navigation-type.dto';

@Injectable()
export class NavigationTypesService {
  create(createNavigationTypeDto: CreateNavigationTypeDto) {
    return 'This action adds a new navigationType';
  }

  findAll() {
    return `This action returns all navigationTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} navigationType`;
  }

  update(id: number, updateNavigationTypeDto: UpdateNavigationTypeDto) {
    return `This action updates a #${id} navigationType`;
  }

  remove(id: number) {
    return `This action removes a #${id} navigationType`;
  }
}
