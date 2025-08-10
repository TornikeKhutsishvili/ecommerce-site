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
    path: 'mens-shirts',
    loadComponent: () => import('./men-shirts/men-shirts').then((m) => m.MenShirts)
  },

  {
    path: 'mens-shoes',
    loadComponent: () => import('./men-shoes/men-shoes').then((m) => m.MenShoes)
  },

  {
    path: 'mens-watches',
    loadComponent: () => import('./men-watches/men-watches').then((m) => m.MenWatches)
  },

  {
    path: 'mobile-accessories',
    loadComponent: () => import('./mobile-accessories/mobile-accessories').then((m) => m.MobileAccessories)
  },

  {
    path: 'motorcycle',
    loadComponent: () => import('./motorcycle/motorcycle').then((m) => m.Motorcycle)
  },

  {
    path: 'skin-care',
    loadComponent: () => import('./skin-care/skin-care').then((m) => m.SkinCare)
  },

  {
    path: 'smartphones',
    loadComponent: () => import('./smartphones/smartphones').then((m) => m.Smartphones)
  },

  {
    path: 'sports-accessories',
    loadComponent: () => import('./sports-accessories/sports-accessories').then((m) => m.SportsAccessories)
  },

  {
    path: 'sunglasses',
    loadComponent: () => import('./sunglasses/sunglasses').then((m) => m.Sunglasses)
  },

  {
    path: 'tablets',
    loadComponent: () => import('./tablets/tablets').then((m) => m.Tablets)
  },

  {
    path: 'tops',
    loadComponent: () => import('./tops/tops').then((m) => m.Tops)
  },

  {
    path: 'vehicle',
    loadComponent: () => import('./vehicle/vehicle').then((m) => m.Vehicle)
  },

  {
    path: 'womens-bags',
    loadComponent: () => import('./womens-bags/womens-bags').then((m) => m.WomensBags)
  },

  {
    path: 'womens-dresses',
    loadComponent: () => import('./womens-dresses/womens-dresses').then((m) => m.WomensDresses)
  },

  {
    path: 'womens-jewellery',
    loadComponent: () => import('./womens-jewellery/womens-jewellery').then((m) => m.WomensJewellery)
  },

  {
    path: 'womens-shoes',
    loadComponent: () => import('./womens-shoes/womens-shoes').then((m) => m.WomensShoes)
  },

  {
    path: 'womens-watches',
    loadComponent: () => import('./womens-watches/womens-watches').then((m) => m.WomensWatches)
  },

];