import { Routes } from '@angular/router';

export const CART_ROUTES: Routes = [

  {
    path: 'cart',
    loadComponent: () => import('./cart')
    .then(m => m.Cart), title: 'Cart'
  },

];