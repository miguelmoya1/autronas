import { Routes } from '@angular/router';

const CLIENTS_DETAILS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./deatails/clients-details.page'),
  },
  // {
  //   path: 'edit',
  //   loadComponent: () => import('./clients-edit.page'),
  // },
  {
    path: '**',
    redirectTo: '',
  },
];

export default CLIENTS_DETAILS_ROUTES;
