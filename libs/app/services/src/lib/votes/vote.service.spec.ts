import { TestBed } from '@angular/core/testing';
import { StoreService } from '@sleep-valley/app/store';
import { VoteApiService } from './vote-api.service';
import { VoteSocketService } from './vote-socket.service';
import { VoteService } from './vote.service';

jest.mock('./vote-api.service');
jest.mock('./vote-socket.service');
jest.mock('@sleep-valley/app/store');

describe('VoteService', () => {
  let service: VoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VoteApiService, VoteSocketService, StoreService],
    });
    service = TestBed.inject(VoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
