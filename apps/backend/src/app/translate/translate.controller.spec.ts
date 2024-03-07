import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { TranslateController } from './translate.controller';

describe('TranslateController', () => {
  let controller: TranslateController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [TranslateController],
    }).compile();

    controller = module.get<TranslateController>(TranslateController);

    jest.clearAllMocks();
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('translate', () => {
    it('Should be defined', () => {
      expect(controller.translate).toBeDefined();
    });

    it('Should be a function', () => {
      expect(controller.translate).toHaveProperty('name', 'translate');
      expect(typeof controller.translate).toBe('function');
      expect(controller.translate).toBeInstanceOf(Function);
    });
  });
});
