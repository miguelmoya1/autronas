import { Routes } from '@angular/router';

const USERS_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'config',
    pathMatch: 'full',
  },
  {
    path: 'config',
    loadComponent: () => import('./config/clients-config.page'),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export default USERS_ROUTES;
