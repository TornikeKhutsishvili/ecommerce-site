import { Routes } from '@angular/router';

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

  {
    path: 'cart',
    loadChildren: () => import('./components/cart/cart.routes')
    .then(m => m.CART_ROUTES), title: 'Cart'
  },

  {
    path: 'checkout',
    loadChildren: () => import('./components/checkout/checkout.routes')
    .then(m => m.CHECKOUT_ROUTES), title: 'Checkout'
  },

  {
    path: 'about',
    loadChildren: () => import('./components/about/about.routes')
    .then(m => m.ABOUT_ROUTES), title: 'About'
  },

  {
    path: 'shop',
    loadChildren: () => import('./components/shop/shop.routes')
    .then((m) => m.SHOP_ROUTES), title: 'Shop'
  },

  {
    path: 'categories',
    loadChildren: () => import('./components/categories/categories.routes')
    .then((m) => m.CATEGORIES_ROUTES), title: 'Categories'
  },

  {
    path: 'contact',
    loadChildren: () => import('./components/contact/contact.routes')
    .then(m => m.CONTACT_ROUTES), title: 'Contact'
  },

  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.routes')
    .then(m => m.AUTH_ROUTES), title: 'Auth'
  },

  {
    path: 'admin',
    loadChildren: () => import('./components/admin/admin.routes')
    .then(m => m.ADMIN_ROUTES), title: 'Admin'
  },

  { path: '**', redirectTo: '' } // Wildcard route for a 404 page

];