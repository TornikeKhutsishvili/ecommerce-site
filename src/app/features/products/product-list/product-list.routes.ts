import { Routes } from '@angular/router';

export const PRODUCTS_LIST_ROUTES: Routes = [

  {
    path: '',
    loadComponent: () => import('./product-list')
    .then(m => m.ProductList), title: 'Product List'
  }

];