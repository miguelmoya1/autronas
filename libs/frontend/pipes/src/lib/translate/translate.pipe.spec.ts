import { TestBed } from '@angular/core/testing';
import { StoreService } from '@autronas/frontend/store';
import { TranslatePipe } from './translate.pipe';

jest.mock('@autronas/frontend/store');

describe('Translate Pipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoreService, TranslatePipe],
      imports: [TranslatePipe],
    });
  });

  it('should be defined', () => {
    expect(TestBed.inject(TranslatePipe)).toBeDefined();
  });

  it('should return the value if the key is not found', () => {
    const value = 'falseKey';
    expect(TestBed.inject(TranslatePipe).transform(value)).toBe(value);
  });
});
