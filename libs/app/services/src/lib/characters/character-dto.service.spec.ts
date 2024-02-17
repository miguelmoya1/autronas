import { TestBed } from '@angular/core/testing';
import { CharacterApiService } from './character-api.service';
import { CharacterDtoService } from './character-dto.service';

jest.mock('./character-api.service');

describe('CharacterDtoService', () => {
  let service: CharacterDtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CharacterApiService],
    });
    service = TestBed.inject(CharacterDtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
