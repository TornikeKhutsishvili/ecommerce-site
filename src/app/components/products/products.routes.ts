import { Routes } from '@angular/router';

export const PRODUCTS_ROUTES: Routes = [

  {
    path: '',
    loadChildren: () => import('./product-list/product-list.routes')
    .then(m => m.PRODUCTS_LIST_ROUTES), title: 'Products'
  },

  {
    path: 'product-details/:id',
    loadChildren: () => import('./product-details/product-details.routes')
    .then(m => m.PRODUCTS_DETAILS_ROUTES), title: 'Product Details'
  }

];