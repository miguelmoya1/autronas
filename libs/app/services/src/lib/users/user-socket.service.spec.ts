import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Socket } from 'ngx-socket-io';
import { UserSocketService } from './user-socket.service';

jest.mock('@sleep-valley/app/services');

describe('UserSocketService', () => {
  let service: UserSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        {
          provide: Socket,
          useValue: {
            emit: jest.fn(),
            fromEvent: jest.fn(),
          },
        },
      ],
    });
    service = TestBed.inject(UserSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
