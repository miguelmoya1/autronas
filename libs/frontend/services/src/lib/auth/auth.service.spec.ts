import { TestBed } from '@angular/core/testing';
import { StoreService } from '@autronas/frontend/store';
import { AuthApiService } from './auth-api.service';
import { AuthService } from './auth.service';

jest.mock('./auth-api.service');
jest.mock('@autronas/frontend/store');

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthApiService, StoreService],
    });

    service = TestBed.inject(AuthService);

    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
