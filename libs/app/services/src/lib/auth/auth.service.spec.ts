import { TestBed } from '@angular/core/testing';
import { StoreService } from '@autronas/app/store';
import { AuthApiService } from './auth-api.service';
import { AuthService } from './auth.service';

jest.mock('./auth-api.service');
jest.mock('@autronas/app/store');

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
