import { Test, TestingModule } from '@nestjs/testing';
import { GameGateway } from './game.gateway';

jest.mock('@autronas/backend/services');

describe('GameGatewayGateway', () => {
  let gateway: GameGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameGateway],
    }).compile();

    gateway = module.get<GameGateway>(GameGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
