import { Injectable } from '@nestjs/common';
import { CreatePropertyAliasDto } from './dto/create-property-alias.dto';
import { UpdatePropertyAliasDto } from './dto/update-property-alias.dto';

@Injectable()
export class PropertyAliasesService {
  create(createPropertyAliasDto: CreatePropertyAliasDto) {
    return 'This action adds a new propertyAlias';
  }

  findAll() {
    return `This action returns all propertyAliases`;
  }

  findOne(id: number) {
    return `This action returns a #${id} propertyAlias`;
  }

  update(id: number, updatePropertyAliasDto: UpdatePropertyAliasDto) {
    return `This action updates a #${id} propertyAlias`;
  }

  remove(id: number) {
    return `This action removes a #${id} propertyAlias`;
  }
}
