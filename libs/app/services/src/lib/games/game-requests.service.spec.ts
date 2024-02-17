import { TestBed } from '@angular/core/testing';
import { StoreService } from '@sleep-valley/app/store';
import { GameApiService } from './game-api.service';
import { GameRequestsService } from './game-requests.service';
import { GameSocketService } from './game-socket.service';

jest.mock('./game-api.service');
jest.mock('./game-socket.service');
jest.mock('@sleep-valley/app/store');

describe('GameRequestsService', () => {
  let service: GameRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameApiService, GameSocketService, StoreService],
    });
    service = TestBed.inject(GameRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
