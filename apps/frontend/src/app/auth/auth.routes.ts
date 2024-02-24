import { Routes } from '@angular/router';

const AUTH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page'),
  },
];

export default AUTH_ROUTES;
