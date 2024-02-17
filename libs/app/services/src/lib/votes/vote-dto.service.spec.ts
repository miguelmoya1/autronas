import { TestBed } from '@angular/core/testing';
import { VoteApiService } from './vote-api.service';
import { VoteDtoService } from './vote-dto.service';

describe('VoteDtoService', () => {
  let service: VoteDtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: VoteApiService,
          useValue: {},
        },
      ],
    });
    service = TestBed.inject(VoteDtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
