import { Routes } from '@angular/router';
import { authGuard } from '../../../core/guards/auth-guard';

export const ORDERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./orders').then((m) => m.Orders),
    title: 'Order', canActivate: [authGuard]
  },

  {
    path: 'orders/:id',
    loadComponent: () =>
      import('./order-details/order-details').then((m) => m.OrderDetails),
    title: 'Orders details', canActivate: [authGuard]
  },
];
