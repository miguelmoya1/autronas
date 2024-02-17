import { TestBed } from '@angular/core/testing';
import { StoreService } from '@sleep-valley/app/store';
import { GameApiService } from './game-api.service';
import { GameSocketService } from './game-socket.service';
import { GameService } from './game.service';

jest.mock('@sleep-valley/app/store');
jest.mock('./game-socket.service');
jest.mock('./game-api.service');

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameSocketService, GameApiService, StoreService],
    });
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
