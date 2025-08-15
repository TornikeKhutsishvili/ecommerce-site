import { Routes } from '@angular/router';

export const PRODUCTS_ROUTES: Routes = [

  {
    path: 'products',
    loadChildren: () => import('./product-list/product-list.routes')
    .then(m => m.PRODUCTS_LIST_ROUTES), title: 'Products'
  },

  // {
  //   path: 'product',
  //   loadComponent: () => import('./product-list/product-list')
  //   .then(m => m.ProductList), title: 'Product List'
  // },

  {
    path: ':id',
    loadChildren: () => import('./product-details/product-details.routes')
    .then(m => m.PRODUCTS_DETAILS_ROUTES), title: 'Product Details'
  }

  // {
  //   path: ':id',
  //   loadComponent: () => import('./product-details/product-details')
  //   .then(m => m.ProductDetails),
  //   data: {
  //     getPrerenderParams: () => generatePrerenderParams(194)
  //   }, title: 'Product Details'
  // },

];