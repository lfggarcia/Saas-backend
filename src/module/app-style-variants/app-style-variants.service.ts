import { Injectable } from '@nestjs/common';
import { CreateAppStyleVariantDto } from './dto/create-app-style-variant.dto';
import { UpdateAppStyleVariantDto } from './dto/update-app-style-variant.dto';

@Injectable()
export class AppStyleVariantsService {
  create(createAppStyleVariantDto: CreateAppStyleVariantDto) {
    return 'This action adds a new appStyleVariant';
  }

  findAll() {
    return `This action returns all appStyleVariants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appStyleVariant`;
  }

  update(id: number, updateAppStyleVariantDto: UpdateAppStyleVariantDto) {
    return `This action updates a #${id} appStyleVariant`;
  }

  remove(id: number) {
    return `This action removes a #${id} appStyleVariant`;
  }
}
