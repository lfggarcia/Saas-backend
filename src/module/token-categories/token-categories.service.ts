import { Injectable } from '@nestjs/common';
import { CreateTokenCategoryDto } from './dto/create-token-category.dto';
import { UpdateTokenCategoryDto } from './dto/update-token-category.dto';

@Injectable()
export class TokenCategoriesService {
  create(createTokenCategoryDto: CreateTokenCategoryDto) {
    return 'This action adds a new tokenCategory';
  }

  findAll() {
    return `This action returns all tokenCategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tokenCategory`;
  }

  update(id: number, updateTokenCategoryDto: UpdateTokenCategoryDto) {
    return `This action updates a #${id} tokenCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} tokenCategory`;
  }
}
