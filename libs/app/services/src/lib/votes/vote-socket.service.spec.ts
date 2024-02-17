import { TestBed } from '@angular/core/testing';
import { Socket } from 'ngx-socket-io';
import { VoteSocketService } from './vote-socket.service';

describe('VoteSocketService', () => {
  let service: VoteSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Socket,
          useValue: {
            on: jest.fn(),
            emit: jest.fn(),
          },
        },
      ],
    });
    service = TestBed.inject(VoteSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
