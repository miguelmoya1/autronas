import { Route } from '@angular/router';
import { authGuard } from '@autronas/frontend/guards';
import { clientsResolver } from '@autronas/frontend/resolvers';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    canActivate: [authGuard(false)],
    loadChildren: () => import('./auth/auth.routes'),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard()],
    loadChildren: () => import('./dashboard/dashboard.routes'),
  },
  {
    path: 'clients',
    resolve: {
      clientsResolver,
    },
    canActivate: [authGuard()],
    loadChildren: () => import('./clients/clients.routes'),
  },
  {
    path: 'users',
    canActivate: [authGuard()],
    loadChildren: () => import('./users/users.routes'),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
