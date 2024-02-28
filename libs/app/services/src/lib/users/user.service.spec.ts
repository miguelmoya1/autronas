import { TestBed } from '@angular/core/testing';
import { StoreService } from '@autronas/app/store';
import { UserApiService } from './user-api.service';
import { UserService } from './user.service';

jest.mock('./user-api.service');
jest.mock('@autronas/app/store');

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
