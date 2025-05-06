import { Injectable } from '@nestjs/common';
import { CreateStyleVariantDto } from './dto/create-style-variant.dto';
import { UpdateStyleVariantDto } from './dto/update-style-variant.dto';

@Injectable()
export class StyleVariantsService {
  create(createStyleVariantDto: CreateStyleVariantDto) {
    return 'This action adds a new styleVariant';
  }

  findAll() {
    return `This action returns all styleVariants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} styleVariant`;
  }

  update(id: number, updateStyleVariantDto: UpdateStyleVariantDto) {
    return `This action updates a #${id} styleVariant`;
  }

  remove(id: number) {
    return `This action removes a #${id} styleVariant`;
  }
}
