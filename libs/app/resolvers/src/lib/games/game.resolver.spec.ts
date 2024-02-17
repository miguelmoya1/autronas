import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { prepareGameResolver } from './game.resolver';

describe('prepareGameResolver', () => {
  const executeResolver: ResolveFn<void> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => prepareGameResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
