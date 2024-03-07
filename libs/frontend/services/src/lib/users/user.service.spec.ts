import { TestBed } from '@angular/core/testing';
import { StoreService } from '@autronas/frontend/store';
import { UserApiService } from './user-api.service';
import { UserService } from './user.service';

jest.mock('./user-api.service');
jest.mock('@autronas/frontend/store');

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreService, UserApiService],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
