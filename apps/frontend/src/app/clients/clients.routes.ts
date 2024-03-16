import { Routes } from '@angular/router';

const CLIENTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./clients.page'),
  },
  {
    path: 'new',
    loadComponent: () => import('./clients-new.page'),
  },

  {
    path: ':id',
    loadChildren: () => import('./details/clients-detail.routes'),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export default CLIENTS_ROUTES;
