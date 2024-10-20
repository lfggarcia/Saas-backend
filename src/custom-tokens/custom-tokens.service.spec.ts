import { Test, TestingModule } from '@nestjs/testing';
import { CustomTokensService } from './custom-tokens.service';

describe('CustomTokensService', () => {
  let service: CustomTokensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomTokensService],
    }).compile();

    service = module.get<CustomTokensService>(CustomTokensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
