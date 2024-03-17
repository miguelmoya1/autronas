import { Routes } from '@angular/router';
import { clientResolver } from '@autronas/frontend/resolvers';

const CLIENTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./all/clients.page'),
  },
  {
    path: 'new',
    loadComponent: () => import('./new/clients-new.page'),
  },
  {
    path: ':clientID',
    resolve: {
      clientResolver,
    },
    loadChildren: () => import('./details/clients-detail.routes'),
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
