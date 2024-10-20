import { Test, TestingModule } from '@nestjs/testing';
import { FormFieldValidationsService } from './form-field-validations.service';

describe('FormFieldValidationsService', () => {
  let service: FormFieldValidationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormFieldValidationsService],
    }).compile();

    service = module.get<FormFieldValidationsService>(FormFieldValidationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
