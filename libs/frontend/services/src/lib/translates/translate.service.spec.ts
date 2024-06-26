import { TestBed } from '@angular/core/testing';
import { StoreService } from '@autronas/frontend/store';
import { TranslateApiService } from './translate-api.service';
import { TranslateService } from './translate.service';

jest.mock('./translate-api.service');
jest.mock('@autronas/frontend/store');

describe('TranslateService', () => {
  let service: TranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranslateApiService, StoreService],
    });
    service = TestBed.inject(TranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
