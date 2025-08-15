import { Routes } from '@angular/router';

// get products id
function generatePrerenderParams(count: number): { id: string }[] {
  return Array.from({ length: count }, (_, i) => ({ id: (i + 1).toString() }));
}

export const CATEGORIES_ROUTES: Routes = [

  {
    path: 'categories',
    loadComponent: () => import('./categories')
    .then(m => m.Categories), title: 'Categories'
  },

  {
    path: 'categories-child',
    loadChildren: () => import('./categories-child/categories-child.routes')
    .then((m) => m.categoriesChildRoutes), title: 'Categories Child',
    data: {
      getPrerenderParams: () => generatePrerenderParams(194)
    }
  },

];