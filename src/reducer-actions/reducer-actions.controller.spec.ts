import { Test, TestingModule } from '@nestjs/testing';
import { ReducerActionsController } from './reducer-actions.controller';

describe('ReducerActionsController', () => {
  let controller: ReducerActionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReducerActionsController],
    }).compile();

    controller = module.get<ReducerActionsController>(ReducerActionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
