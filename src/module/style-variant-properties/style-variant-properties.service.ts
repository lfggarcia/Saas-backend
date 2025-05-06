import { Injectable } from '@nestjs/common';
import { CreateStyleVariantPropertyDto } from './dto/create-style-variant-property.dto';
import { UpdateStyleVariantPropertyDto } from './dto/update-style-variant-property.dto';

@Injectable()
export class StyleVariantPropertiesService {
  create(createStyleVariantPropertyDto: CreateStyleVariantPropertyDto) {
    return 'This action adds a new styleVariantProperty';
  }

  findAll() {
    return `This action returns all styleVariantProperties`;
  }

  findOne(id: number) {
    return `This action returns a #${id} styleVariantProperty`;
  }

  update(id: number, updateStyleVariantPropertyDto: UpdateStyleVariantPropertyDto) {
    return `This action updates a #${id} styleVariantProperty`;
  }

  remove(id: number) {
    return `This action removes a #${id} styleVariantProperty`;
  }
}
