import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CharacterApiService } from './character-api.service';

describe('CharacterApiService', () => {
  let service: CharacterApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(CharacterApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
