import { Routes } from '@angular/router';

// get products id
function generatePrerenderParams(count: number): { id: string }[] {
  return Array.from({ length: count }, (_, i) => ({ id: (i + 1).toString() }));
}

export const PRODUCTS_ROUTES: Routes = [

  {
    path: 'product',
    loadComponent: () => import('./product-list/product-list')
    .then(m => m.ProductList), title: 'Product List'
  },

  {
    path: 'product:id',
    loadComponent: () => import('./product-details/product-details')
    .then(m => m.ProductDetails), title: 'Product Details',
    data: {
      getPrerenderParams: () => generatePrerenderParams(194)
    }
  },

];