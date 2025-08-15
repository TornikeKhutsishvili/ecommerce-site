import { Routes } from '@angular/router';

// get products id
function generatePrerenderParams(count: number): { id: string }[] {
  return Array.from({ length: count }, (_, i) => ({ id: (i + 1).toString() }));
}

export const PRODUCTS_DETAILS_ROUTES: Routes = [

  {
    path: '/:id',
    loadComponent: () => import('./product-details')
    .then(m => m.ProductDetails),
    data: {
      getPrerenderParams: () => generatePrerenderParams(194)
    },
    title: 'Product Details'
  }

];