import { Routes } from '@angular/router';

export const TERMS_ROUTES: Routes = [

  {
    path: '',
    loadComponent: () => import('./terms')
    .then(m => m.Terms), title: 'Terms'
  }

];