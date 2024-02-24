import { Routes } from '@angular/router';

const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard.page'),
  },
];

export default DASHBOARD_ROUTES;
