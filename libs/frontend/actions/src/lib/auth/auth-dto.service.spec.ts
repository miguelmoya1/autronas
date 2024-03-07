import { TestBed } from '@angular/core/testing';
import { AuthApiService } from '@autronas/frontend/services';
import { StoreService } from '@autronas/frontend/store';
import { AuthDtoService } from './auth-dto.service';

jest.mock('@autronas/frontend/store');
jest.mock('@autronas/frontend/services');

describe('AuthDtoService', () => {
  let service: AuthDtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthApiService, StoreService],
    });
    service = TestBed.inject(AuthDtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
