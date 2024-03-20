import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanDeactivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { StoreService } from '@autronas/frontend/store';
import { Observable } from 'rxjs';
import { authGuard } from './auth.guard';

jest.mock('@autronas/frontend/store');

describe('authGuardLogged', () => {
  describe('authGuardLogged', () => {
    const executeGuard: CanDeactivateFn<boolean> = () => TestBed.runInInjectionContext(() => authGuard(true)());

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          StoreService,
          {
            provide: Router,
            useValue: {
              url: '/url',
            },
          },
        ],
      });

      jest.clearAllMocks();
    });

    it('should return Observable', () => {
      const activatedRouteSnapshot = {} as ActivatedRouteSnapshot;
      const routerStateSnapshot = {} as RouterStateSnapshot;

      const result = executeGuard(true, activatedRouteSnapshot, routerStateSnapshot, routerStateSnapshot);

      expect(result).toBeTruthy();
    });

    it('should return Observable that emits true', () => {
      const activatedRouteSnapshot = {} as ActivatedRouteSnapshot;
      const routerStateSnapshot = {} as RouterStateSnapshot;

      const result = executeGuard(true, activatedRouteSnapshot, routerStateSnapshot, routerStateSnapshot);

      if (result instanceof Observable) {
        result.subscribe((value) => expect(value).toBeTruthy());
      }

      expect(result).toBeTruthy();
    });
  });
});
