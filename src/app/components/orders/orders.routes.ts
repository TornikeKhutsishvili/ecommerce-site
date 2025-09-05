import { Routes } from '@angular/router';

export const ORDERS_ROUTES: Routes = [

  {
    path: '',
    loadComponent: () => import('./orders')
    .then(m => m.Orders), title: 'Order'
  },

  {
    path: 'orders/:id',
    loadComponent: () => import('./order-details/order-details')
    .then(m => m.OrderDetails), title: 'Orders details'
  }

];