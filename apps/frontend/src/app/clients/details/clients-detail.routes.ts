import { Routes } from '@angular/router';

const CLIENTS_DETAILS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./details/clients-details.page'),
  },
  {
    path: 'edit',
    loadComponent: () => import('./edit/clients-edit.page'),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export default CLIENTS_DETAILS_ROUTES;
