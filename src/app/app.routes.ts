import { Routes } from '@angular/router';

// get products id
// function generatePrerenderParams(count: number): { id: string }[] {
//   return Array.from({ length: count }, (_, i) => ({ id: (i + 1).toString() }));
// }

// routes
export const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./components/home/home')
    .then((m) => m.Home), title: 'Home'
  },

  {
    path: 'home',
    pathMatch: 'full',
    loadComponent: () => import('./components/home/home')
    .then((m) => m.Home), title: 'Home'
  },

  {
    path: 'products',
    loadChildren: () => import('./components/products/products.routes')
    .then(m => m.PRODUCTS_ROUTES), title: 'Products'
  },

  // { path: 'products',
  //   loadComponent: () => import('./components/products/product-list/product-list')
  //   .then((m) => m.ProductList)
  // },

  // { path: 'product/:id',
  //   loadComponent: () => import('./components/products/product-details/product-details')
  //   .then((m) => m.ProductDetails),
  //   data: {
  //     getPrerenderParams: () => generatePrerenderParams(194)
  //   }
  // },

  {
    path: 'cart',
    loadChildren: () => import('./components/cart/cart.routes')
    .then(m => m.CART_ROUTES), title: 'Cart'
  },

  // { path: 'cart',
  //   loadComponent: () => import('./components/cart/cart')
  //   .then((m) => m.Cart)
  // },

  {
    path: 'checkout',
    loadChildren: () => import('./components/checkout/checkout.routes')
    .then(m => m.CHECKOUT_ROUTES), title: 'Checkout'
  },

  // { path: 'checkout',
  //   loadComponent: () => import('./components/checkout/checkout')
  //   .then((m) => m.Checkout)
  // },

  {
    path: 'about',
    loadChildren: () => import('./components/about/about.routes')
    .then(m => m.ABOUT_ROUTES), title: 'About'
  },

  // {
  //   path: 'about',
  //   loadComponent: () => import('./components/about/about')
  //   .then((m) => m.About), title: 'About'
  // },

  {
    path: 'shop',
    loadChildren: () => import('./components/shop/shop.routes')
    .then((m) => m.SHOP_ROUTES), title: 'Shop'
  },

  // {
  //   path: 'shop',
  //   loadComponent: () => import('./components/shop/shop')
  //   .then((m) => m.Shop), title: 'Shop'
  // },

  {
    path: 'categories',
    loadChildren: () => import('./components/categories/categories.routes')
    .then((m) => m.CATEGORIES_ROUTES), title: 'Categories'
  },

  // {
  //   path: 'categories',
  //   loadComponent: () => import('./components/categories/categories')
  //   .then((m) => m.Categories), title: 'Categories'
  // },

  // {
  //   path: 'categories-child',
  //   loadChildren: () => import('./components/categories/categories-child/categories-child.routes')
  //   .then((m) => m.categoriesChildRoutes), title: 'Categories Child',
  //   data: {
  //     getPrerenderParams: () => generatePrerenderParams(194)
  //   }
  // },

  {
    path: 'contact',
    loadChildren: () => import('./components/contact/contact.routes')
    .then(m => m.CONTACT_ROUTES), title: 'Contact'
  },

  // {
  //   path: 'contact',
  //   loadComponent: () => import('./components/contact/contact')
  //   .then((m) => m.Contact), title: 'Contact'
  // },

  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.routes')
    .then(m => m.AUTH_ROUTES), title: 'Auth'
  },

  // { path: 'login', component: Login },

  // { path: 'register', component: Register },

  // { path: 'profile', component: Profile, canActivate: [authGuard] },

  // { path: 'edit-profile', component: EditProfile, canActivate: [authGuard] },

  {
    path: 'admin',
    loadChildren: () => import('./components/admin/admin.routes')
    .then(m => m.ADMIN_ROUTES), title: 'Admin'
  },

  // { path: 'admin', component: Dashboard, canActivate: [adminGuard] },

  // { path: 'admin/dashboard-analytics', component: DashboardAnalytics, canActivate: [adminGuard] },

  // { path: 'admin/add-product', component: AddProduct, canActivate: [adminGuard] },

  // { path: 'admin/edit-product/:id', component: EditProduct, canActivate: [adminGuard] },

  { path: '**', redirectTo: '' } // Wildcard route for a 404 page

];