import { TestBed } from '@angular/core/testing';
import { ClientApiService } from '@autronas/frontend/services';
import { StoreService } from '@autronas/frontend/store';
import { ClientsDtoService } from './clients-dto.service';

jest.mock('@autronas/frontend/store');
jest.mock('@autronas/frontend/services');

describe('ClientsDtoService', () => {
  let service: ClientsDtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientApiService, StoreService],
    });
    service = TestBed.inject(ClientsDtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
