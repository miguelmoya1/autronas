import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { StoreService } from '@sleep-valley/app/store';
import { Socket } from 'ngx-socket-io';
import { GameSocketService } from './game-socket.service';

jest.mock('@sleep-valley/app/store');

describe('GameSocketService', () => {
  let service: GameSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        StoreService,

        {
          provide: Socket,
          useValue: {
            emit: jest.fn(),
            fromEvent: jest.fn(),
          },
        },
      ],
    });
    service = TestBed.inject(GameSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
