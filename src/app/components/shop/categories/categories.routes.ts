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
  },

  {
    path: 'home-decoration',
    loadComponent: () => import('./home-decoration/home-decoration').then((m) => m.HomeDecoration)
  },

  {
    path: 'kitchen-accessories',
    loadComponent: () => import('./kitchen-accessories/kitchen-accessories').then((m) => m.KitchenAccessories)
  },

  {
    path: 'laptops',
    loadComponent: () => import('./laptops/laptops').then((m) => m.Laptops)
  },

  {
    path: 'men-shirts',
    loadComponent: () => import('./men-shirts/men-shirts').then((m) => m.MenShirts)
  },

  {
    path: 'men-shoes',
    loadComponent: () => import('./men-shoes/men-shoes').then((m) => m.MenShoes)
  },

  {
    path: 'men-watches',
    loadComponent: () => import('./men-watches/men-watches').then((m) => m.MenWatches)
  },

  {
    path: 'mobile-accessories',
    loadComponent: () => import('./mobile-accessories/mobile-accessories').then((m) => m.MobileAccessories)
  },

];