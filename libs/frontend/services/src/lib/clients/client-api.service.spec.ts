import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ClientApiService } from './client-api.service';

describe('ClientApiService', () => {
  let service: ClientApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ClientApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
