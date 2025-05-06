import { Injectable } from '@nestjs/common';
import { CreateAppStyleVariantPropertyDto } from './dto/create-app-style-variant-property.dto';
import { UpdateAppStyleVariantPropertyDto } from './dto/update-app-style-variant-property.dto';

@Injectable()
export class AppStyleVariantPropertiesService {
  create(createAppStyleVariantPropertyDto: CreateAppStyleVariantPropertyDto) {
    return 'This action adds a new appStyleVariantProperty';
  }

  findAll() {
    return `This action returns all appStyleVariantProperties`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appStyleVariantProperty`;
  }

  update(id: number, updateAppStyleVariantPropertyDto: UpdateAppStyleVariantPropertyDto) {
    return `This action updates a #${id} appStyleVariantProperty`;
  }

  remove(id: number) {
    return `This action removes a #${id} appStyleVariantProperty`;
  }
}
