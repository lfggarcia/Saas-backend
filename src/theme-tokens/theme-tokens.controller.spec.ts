import { Test, TestingModule } from '@nestjs/testing';
import { ThemeTokensController } from './theme-tokens.controller';

describe('ThemeTokensController', () => {
  let controller: ThemeTokensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThemeTokensController],
    }).compile();

    controller = module.get<ThemeTokensController>(ThemeTokensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
