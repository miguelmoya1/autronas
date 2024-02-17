import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { TranslateApiService } from './translate-api.service';

describe('TranslateApiService', () => {
  let service: TranslateApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(TranslateApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
