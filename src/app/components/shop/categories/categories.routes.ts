import { Routes } from '@angular/router';

export const categoriesRoutes: Routes = [

  {
    path: 'beauty',
    loadComponent: () => import('./beauty/beauty').then((m) => m.Beauty)
  },

  {
    path: 'fragrances',
    loadComponent: () => import('./fragrances/fragrances').then((m) => m.Fragrances)
  },

  {
    path: 'furniture',
    loadComponent: () => import('./furniture/furniture').then((m) => m.Furniture)
  },

  {
    path: 'groceries',
    loadComponent: () => import('./groceries/groceries').then((m) => m.Groceries)
  }

];