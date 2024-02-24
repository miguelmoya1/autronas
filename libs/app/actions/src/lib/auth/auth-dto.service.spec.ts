import { TestBed } from '@angular/core/testing';
import { AuthApiService } from '@autronas/app/services';
import { StoreService } from '@autronas/app/store';
import { AuthDtoService } from './auth-dto.service';

jest.mock('@autronas/app/store');
jest.mock('@autronas/app/services');

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
