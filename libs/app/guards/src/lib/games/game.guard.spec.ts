import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';
import { gameGuardDeactivate } from './game.guard';

describe('gameGuardDeactivate', () => {
  const executeGuard: CanDeactivateFn<boolean> = (...guardParameters) =>
    TestBed.runInInjectionContext(() => gameGuardDeactivate(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
