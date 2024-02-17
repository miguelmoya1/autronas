import { TestBed } from '@angular/core/testing';
import { Socket } from 'ngx-socket-io';
import { CharacterSocketService } from './character-socket.service';

jest.mock('@sleep-valley/app/store');

describe('CharacterSocketService', () => {
  let service: CharacterSocketService;

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
    service = TestBed.inject(CharacterSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
