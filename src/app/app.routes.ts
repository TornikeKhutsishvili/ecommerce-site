import { Routes } from '@angular/router';

// routes
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./features/pages/home/home').then((m) => m.Home),
    title: 'Home',
  },

  {
    path: 'home',
    pathMatch: 'full',
    loadComponent: () => import('./features/pages/home/home').then((m) => m.Home),
    title: 'Home',
  },

  {
    path: 'products',
    loadChildren: () =>
      import('./features/pages/products/products.routes').then(
        (m) => m.PRODUCTS_ROUTES,
      ),
    title: 'Products',
  },

  {
    path: 'rules',
    loadChildren: () =>
      import('./features/pages/rules/rules.routes').then((m) => m.RULES_ROUTES),
    title: 'Rules',
  },

  {
    path: 'cart',
    loadChildren: () =>
      import('./features/pages/cart/cart.routes').then((m) => m.CART_ROUTES),
    title: 'Cart',
  },

  {
    path: 'checkout',
    loadChildren: () =>
      import('./features/pages/checkout/checkout.routes').then(
        (m) => m.CHECKOUT_ROUTES,
      ),
    title: 'Checkout',
  },

  {
    path: 'orders',
    loadChildren: () =>
      import('./features/pages/orders/orders.routes').then((m) => m.ORDERS_ROUTES),
    title: 'Orders',
  },

  {
    path: 'about',
    loadChildren: () =>
      import('./shared/components/about/about.routes').then(
        (m) => m.ABOUT_ROUTES,
      ),
    title: 'About',
  },

  // {
  //   path: 'shop',
  //   loadChildren: () => import('./components/shop/shop.routes')
  //   .then((m) => m.SHOP_ROUTES), title: 'Shop'
  // },

  {
    path: 'categories',
    loadChildren: () =>
      import('./features/pages/categories/categories.routes').then(
        (m) => m.CATEGORIES_ROUTES,
      ),
    title: 'Categories',
  },

  {
    path: 'contact',
    loadChildren: () =>
      import('./features/pages/contact/contact.routes').then(
        (m) => m.CONTACT_ROUTES,
      ),
    title: 'Contact',
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
    title: 'Auth',
  },

  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
    title: 'Admin',
  },

  {
    path: '**',
    loadComponent: () =>
      import('./features/pages/error-page/error-page').then((m) => m.ErrorPage),
    title: '404 - Not Found',
  },
];
