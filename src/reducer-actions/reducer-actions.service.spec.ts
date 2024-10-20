import { Test, TestingModule } from '@nestjs/testing';
import { ReducerActionsService } from './reducer-actions.service';

describe('ReducerActionsService', () => {
  let service: ReducerActionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReducerActionsService],
    }).compile();

    service = module.get<ReducerActionsService>(ReducerActionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
