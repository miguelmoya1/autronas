import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanDeactivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreService } from '@autronas/frontend/store';
import { Observable } from 'rxjs';
import { authGuardLogged } from './auth.guard';

jest.mock('@autronas/frontend/store');

describe('authGuardLogged', () => {
  describe('authGuardLogged', () => {
    const executeGuard: CanDeactivateFn<boolean> = (...guardParameters) =>
      TestBed.runInInjectionContext(() => authGuardLogged(...guardParameters));

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [StoreService],
        imports: [RouterTestingModule],
      });

      jest.clearAllMocks();
    });

    it('should return Observable', () => {
      const activatedRouteSnapshot = {} as ActivatedRouteSnapshot;
      const routerStateSnapshot = {} as RouterStateSnapshot;

      const result = executeGuard(
        true,
        activatedRouteSnapshot,
        routerStateSnapshot,
        routerStateSnapshot,
      );

      expect(result).toBeTruthy();
    });

    it('should return Observable that emits true', () => {
      const activatedRouteSnapshot = {} as ActivatedRouteSnapshot;
      const routerStateSnapshot = {} as RouterStateSnapshot;

      const result = executeGuard(
        true,
        activatedRouteSnapshot,
        routerStateSnapshot,
        routerStateSnapshot,
      );

      if (result instanceof Observable) {
        result.subscribe((value) => expect(value).toBeTruthy());
      }

      expect(result).toBeTruthy();
    });
  });
});
