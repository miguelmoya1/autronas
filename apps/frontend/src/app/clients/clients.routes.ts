import { Routes } from '@angular/router';

const CLIENTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./clients.page'),
    children: [
      // {
      //   path: '',
      //   loadComponent: () => import('./clients-table.page'),
      // },
      // {
      //   path: 'new',
      //   loadComponent: () => import('./client-form.page'),
      // },
      // {
      //   path: ':id',
      //   loadComponent: () => import('./client-details.page'),
      // },
      // {
      //   path: ':id/edit',
      //   loadComponent: () => import('./client-form.page'),
      // },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export default CLIENTS_ROUTES;
