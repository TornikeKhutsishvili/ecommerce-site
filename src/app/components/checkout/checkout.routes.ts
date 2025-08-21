import { Routes } from '@angular/router';

export const CHECKOUT_ROUTES: Routes = [

  {
    path: '',
    loadComponent: () =>import('./checkout')
    .then((m) => m.Checkout), title: 'Checkout'
  },

  {
    path: 'success',
    loadComponent: () => import('./success/success')
    .then(m => m.Success), title: 'Success'
  },

  {
    path: 'cancel',
    loadComponent: () => import('./cancel/cancel')
    .then(m => m.Cancel), title: 'Cancel'
  },

];