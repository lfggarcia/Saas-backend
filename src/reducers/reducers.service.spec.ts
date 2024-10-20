import { Test, TestingModule } from '@nestjs/testing';
import { ReducersService } from './reducers.service';

describe('ReducersService', () => {
  let service: ReducersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReducersService],
    }).compile();

    service = module.get<ReducersService>(ReducersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
