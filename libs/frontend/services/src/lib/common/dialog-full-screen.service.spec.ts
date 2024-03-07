import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DialogFullScreenService } from './dialog-full-screen.service';

describe('DialogFullScreenService', () => {
  let service: DialogFullScreenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
    });
    service = TestBed.inject(DialogFullScreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
