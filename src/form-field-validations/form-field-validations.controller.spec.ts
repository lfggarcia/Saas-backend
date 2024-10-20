import { Test, TestingModule } from '@nestjs/testing';
import { FormFieldValidationsController } from './form-field-validations.controller';

describe('FormFieldValidationsController', () => {
  let controller: FormFieldValidationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormFieldValidationsController],
    }).compile();

    controller = module.get<FormFieldValidationsController>(FormFieldValidationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
