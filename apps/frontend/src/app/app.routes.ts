import { Route } from '@angular/router';
import { authGuardLogged, authGuardNotLogged } from '@autronas/app/guards';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    canActivate: [authGuardNotLogged],
    loadChildren: () => import('./auth/auth.routes'),
  },
  {
    path: 'dashboard',
    canActivate: [authGuardLogged],
    loadChildren: () => import('./dashboard/dashboard.routes'),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
