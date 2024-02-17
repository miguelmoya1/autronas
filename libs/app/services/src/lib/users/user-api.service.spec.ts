import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { UserApiService } from './user-api.service';

describe('USerApiService', () => {
  let service: UserApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(UserApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
