import { Routes } from '@angular/router';

export const CHECKOUT_ROUTES: Routes = [

  { path: 'checkout',
    loadComponent: () =>import('./checkout')
    .then((m) => m.Checkout), title: 'Checkout'
  },

//   {
//     path: 'success',
//     loadComponent: () =>
//       import('./checkout-success/checkout-success.component').then(m => m.CheckoutSuccessComponent),
//   },

//   {
//     path: 'cancel',
//     loadComponent: () =>
//       import('./checkout-cancel/checkout-cancel.component').then(m => m.CheckoutCancelComponent),
//   },

];