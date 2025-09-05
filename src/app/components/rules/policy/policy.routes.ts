import { Routes } from '@angular/router';

export const POLICY_ROUTES: Routes = [

  {
    path: '',
    loadComponent: () => import('./policy')
    .then(m => m.Policy), title: 'Policy'
  }

];