import { Route } from '@angular/router';
import { authGuard } from '@autronas/frontend/guards';
import { clientsResolver, initialResolver } from '@autronas/frontend/resolvers';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    resolve: {
      initialResolver,
    },
    canActivate: [authGuard(false)],
    loadChildren: () => import('./auth/auth.routes'),
  },
  {
    path: 'dashboard',
    resolve: {
      initialResolver,
    },
    canActivate: [authGuard()],
    loadChildren: () => import('./dashboard/dashboard.routes'),
  },
  {
    path: 'clients',
    resolve: {
      initialResolver,
      clientsResolver,
    },
    canActivate: [authGuard()],
    loadChildren: () => import('./clients/clients.routes'),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
