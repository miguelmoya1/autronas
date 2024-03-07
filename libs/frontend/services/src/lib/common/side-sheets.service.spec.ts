import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SideSheetsService } from './side-sheets.service';

describe('SideSheetsService', () => {
  let service: SideSheetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    });
    service = TestBed.inject(SideSheetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
