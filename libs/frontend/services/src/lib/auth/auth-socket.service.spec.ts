import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { StoreService } from '@autronas/frontend/store';
import { Socket } from 'ngx-socket-io';
import { AuthSocketService } from './auth-socket.service';
import { AuthService } from './auth.service';

jest.mock('@autronas/frontend/store');

describe('AuthSocketService', () => {
  let service: AuthSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        StoreService,
        {
          provide: AuthService,
          useValue: {
            isLogged: jest.fn(),
            token: jest.fn(),
          },
        },
        {
          provide: Socket,
          useValue: {
            on: jest.fn(),
            emit: jest.fn(),
          },
        },
      ],
    });
    service = TestBed.inject(AuthSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
