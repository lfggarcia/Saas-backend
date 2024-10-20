import { Test, TestingModule } from '@nestjs/testing';
import { ReducersController } from './reducers.controller';

describe('ReducersController', () => {
  let controller: ReducersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReducersController],
    }).compile();

    controller = module.get<ReducersController>(ReducersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
