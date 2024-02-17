import { TestBed } from '@angular/core/testing';
import { StoreService } from '@sleep-valley/app/store';
import { TranslateApiService } from './translate-api.service';
import { TranslateService } from './translate.service';

jest.mock('./translate-api.service');
jest.mock('@sleep-valley/app/store');

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