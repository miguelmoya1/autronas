import { TestBed } from '@angular/core/testing';
import { StoreService } from '@autronas/frontend/store';
import { ClientApiService } from './client-api.service';
import { ClientsService } from './clients.service';

jest.mock('./client-api.service');
jest.mock('@autronas/frontend/store');

describe('ClientsService', () => {
  let service: ClientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreService, ClientApiService],
    });
    service = TestBed.inject(ClientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
