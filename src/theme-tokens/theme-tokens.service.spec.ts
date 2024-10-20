import { Test, TestingModule } from '@nestjs/testing';
import { ThemeTokensService } from './theme-tokens.service';

describe('ThemeTokensService', () => {
  let service: ThemeTokensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThemeTokensService],
    }).compile();

    service = module.get<ThemeTokensService>(ThemeTokensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
