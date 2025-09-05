import { Routes } from '@angular/router';

export const FAQ_ROUTES: Routes = [

  {
    path: '',
    loadComponent: () => import('./faq')
    .then(m => m.FAQ), title: 'FAQ'
  }

];