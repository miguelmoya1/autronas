import { TestBed } from '@angular/core/testing';
import { StoreService } from '@sleep-valley/app/store';
import { GameApiService } from './game-api.service';
import { GameSocketService } from './game-socket.service';
import { GamesService } from './games.service';

jest.mock('./game-api.service');
jest.mock('./game-socket.service');
jest.mock('@sleep-valley/app/store');

describe('GamesService', () => {
  let service: GamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameApiService, GameSocketService, StoreService],
    });
    service = TestBed.inject(GamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
