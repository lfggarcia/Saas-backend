import { Test, TestingModule } from '@nestjs/testing';
import { CustomTokensController } from './custom-tokens.controller';

describe('CustomTokensController', () => {
  let controller: CustomTokensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomTokensController],
    }).compile();

    controller = module.get<CustomTokensController>(CustomTokensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
