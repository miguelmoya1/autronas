import { TestBed } from '@angular/core/testing';
import { StoreService } from '@sleep-valley/app/store';
import { UserApiService } from './user-api.service';
import { UserSocketService } from './user-socket.service';
import { UsersInGameService } from './users-in-game.service';

jest.mock('./user-api.service');
jest.mock('./user-socket.service');
jest.mock('@sleep-valley/app/store');

describe('UsersInGameService', () => {
  let service: UsersInGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserApiService, UserSocketService, StoreService],
    });
    service = TestBed.inject(UsersInGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
