import { Routes } from '@angular/router';
import { authGuard } from '../../../core/guards/auth-guard';

export const CHECKOUT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./checkout').then((m) => m.Checkout),
    title: 'Checkout', canActivate: [authGuard],
  },

  {
    path: 'success',
    loadComponent: () => import('./success/success').then((m) => m.Success),
    title: 'Success', canActivate: [authGuard],
  },

  {
    path: 'cancel',
    loadComponent: () => import('./cancel/cancel').then((m) => m.Cancel),
    title: 'Cancel', canActivate: [authGuard],
  },
];
