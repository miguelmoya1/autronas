import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { initialResolver } from './initial.resolver';

describe('initialResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => initialResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
