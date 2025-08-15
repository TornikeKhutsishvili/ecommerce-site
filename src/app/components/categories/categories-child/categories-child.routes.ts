import { Routes } from '@angular/router';

export const categoriesChildRoutes: Routes = [

  {
    path: 'beauty',
    loadComponent: () => import('./beauty/beauty')
    .then((m) => m.Beauty), title: 'Beauty'
  },

  {
    path: 'fragrances',
    loadComponent: () => import('./fragrances/fragrances')
    .then((m) => m.Fragrances), title: 'Fragrances'
  },

  {
    path: 'furniture',
    loadComponent: () => import('./furniture/furniture')
    .then((m) => m.Furniture), title: 'Furniture'
  },

  {
    path: 'groceries',
    loadComponent: () => import('./groceries/groceries')
    .then((m) => m.Groceries), title: 'Groceries'
  },

  {
    path: 'home-decoration',
    loadComponent: () => import('./home-decoration/home-decoration')
    .then((m) => m.HomeDecoration), title: 'Home Decoration'
  },

  {
    path: 'kitchen-accessories',
    loadComponent: () => import('./kitchen-accessories/kitchen-accessories')
    .then((m) => m.KitchenAccessories), title: 'Kitchen Accessories'
  },

  {
    path: 'laptops',
    loadComponent: () => import('./laptops/laptops')
    .then((m) => m.Laptops), title: 'Laptops'
  },

  {
    path: 'mens-shirts',
    loadComponent: () => import('./men-shirts/men-shirts')
    .then((m) => m.MenShirts), title: 'Mens Shirts'
  },

  {
    path: 'mens-shoes',
    loadComponent: () => import('./men-shoes/men-shoes')
    .then((m) => m.MenShoes), title: 'Mens Shoes'
  },

  {
    path: 'mens-watches',
    loadComponent: () => import('./men-watches/men-watches')
    .then((m) => m.MenWatches), title: 'Mens Watches'
  },

  {
    path: 'mobile-accessories',
    loadComponent: () => import('./mobile-accessories/mobile-accessories')
    .then((m) => m.MobileAccessories), title: 'Mobile Accessories'
  },

  {
    path: 'motorcycle',
    loadComponent: () => import('./motorcycle/motorcycle')
    .then((m) => m.Motorcycle), title: 'Motorcycle'
  },

  {
    path: 'skin-care',
    loadComponent: () => import('./skin-care/skin-care')
    .then((m) => m.SkinCare), title: 'Skin Care'
  },

  {
    path: 'smartphones',
    loadComponent: () => import('./smartphones/smartphones')
    .then((m) => m.Smartphones), title: 'Smartphones'
  },

  {
    path: 'sports-accessories',
    loadComponent: () => import('./sports-accessories/sports-accessories')
    .then((m) => m.SportsAccessories), title: 'Sports Accessories'
  },

  {
    path: 'sunglasses',
    loadComponent: () => import('./sunglasses/sunglasses')
    .then((m) => m.Sunglasses), title: 'Sunglasses'
  },

  {
    path: 'tablets',
    loadComponent: () => import('./tablets/tablets')
    .then((m) => m.Tablets), title: 'Tablets'
  },

  {
    path: 'tops',
    loadComponent: () => import('./tops/tops')
    .then((m) => m.Tops), title: 'Tops'
  },

  {
    path: 'vehicle',
    loadComponent: () => import('./vehicle/vehicle')
    .then((m) => m.Vehicle), title: 'Vehicle'
  },

  {
    path: 'womens-bags',
    loadComponent: () => import('./womens-bags/womens-bags')
    .then((m) => m.WomensBags), title: 'Womens Bags'
  },

  {
    path: 'womens-dresses',
    loadComponent: () => import('./womens-dresses/womens-dresses')
    .then((m) => m.WomensDresses), title: 'Womens Dresses'
  },

  {
    path: 'womens-jewellery',
    loadComponent: () => import('./womens-jewellery/womens-jewellery')
    .then((m) => m.WomensJewellery), title: 'Womens Jewellery'
  },

  {
    path: 'womens-shoes',
    loadComponent: () => import('./womens-shoes/womens-shoes')
    .then((m) => m.WomensShoes), title: 'Womens Shoes'
  },

  {
    path: 'womens-watches',
    loadComponent: () => import('./womens-watches/womens-watches')
    .then((m) => m.WomensWatches), title: 'Womens Watches'
  },

];