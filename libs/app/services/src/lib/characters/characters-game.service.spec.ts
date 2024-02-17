import { TestBed } from '@angular/core/testing';
import { StoreService } from '@sleep-valley/app/store';
import { CharacterApiService } from './character-api.service';
import { CharacterSocketService } from './character-socket.service';
import { CharactersGameService } from './characters-game.service';

jest.mock('./character-api.service');
jest.mock('./character-socket.service');
jest.mock('@sleep-valley/app/store');

describe('CharactersGameService', () => {
  let service: CharactersGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CharacterApiService, CharacterSocketService, StoreService],
    });
    service = TestBed.inject(CharactersGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
