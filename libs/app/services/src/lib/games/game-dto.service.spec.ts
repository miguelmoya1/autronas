import { TestBed } from '@angular/core/testing';
import { GameApiService } from './game-api.service';
import { GameDtoService } from './game-dto.service';
import { GamesService } from './games.service';

describe('GameDtoService', () => {
  let service: GameDtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: GamesService,
          useValue: {},
        },
        {
          provide: GameApiService,
          useValue: {},
        },
      ],
    });
    service = TestBed.inject(GameDtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
