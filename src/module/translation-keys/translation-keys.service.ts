import { Injectable } from '@nestjs/common';
import { CreateTranslationKeyDto } from './dto/create-translation-key.dto';
import { UpdateTranslationKeyDto } from './dto/update-translation-key.dto';

@Injectable()
export class TranslationKeysService {
  create(createTranslationKeyDto: CreateTranslationKeyDto) {
    return 'This action adds a new translationKey';
  }

  findAll() {
    return `This action returns all translationKeys`;
  }

  findOne(id: number) {
    return `This action returns a #${id} translationKey`;
  }

  update(id: number, updateTranslationKeyDto: UpdateTranslationKeyDto) {
    return `This action updates a #${id} translationKey`;
  }

  remove(id: number) {
    return `This action removes a #${id} translationKey`;
  }
}
