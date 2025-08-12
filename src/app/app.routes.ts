import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin-guard';
import { authGuard } from './guards/auth-guard';
import { Dashboard } from './components/admin/dashboard/dashboard';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { Profile } from './components/auth/profile/profile';
import { EditProfile } from './components/auth/edit-profile/edit-profile';
import { AddProduct } from './components/admin/add-product/add-product';
import { EditProduct } from './components/admin/edit-product/edit-product';
import { DashboardAnalytics } from './components/admin/dashboard-analytics/dashboard-analytics';

// get products id
function generatePrerenderParams(count: number): { id: string }[] {
  return Array.from({ length: count }, (_, i) => ({ id: (i + 1).toString() }));
}

// routes
export const routes: Routes = [

  { path: '',
    loadComponent: () => import('./components/home/home')
    .then((m) => m.Home)
  },

  { path: 'home',
    loadComponent: () => import('./components/home/home')
    .then((m) => m.Home)
  },

  { path: 'products',
    loadComponent: () => import('./components/products/product-list/product-list')
    .then((m) => m.ProductList)
  },

  { path: 'product/:id',
    loadComponent: () => import('./components/products/product-details/product-details')
    .then((m) => m.ProductDetails),
    data: {
      getPrerenderParams: () => generatePrerenderParams(194)
    }
  },

  { path: 'cart',
    loadComponent: () => import('./components/cart/cart')
    .then((m) => m.Cart)
  },

  { path: 'checkout',
    loadComponent: () => import('./components/checkout/checkout')
    .then((m) => m.Checkout)
  },

  { path: 'about',
    loadComponent: () => import('./components/about/about')
    .then((m) => m.About)
  },

  { path: 'shop',
    loadComponent: () => import('./components/shop/shop')
    .then((m) => m.Shop)
  },

  { path: 'categories',
    loadComponent: () => import('./components/categories/categories')
    .then((m) => m.Categories)
  },

  { path: 'categories-child',
    loadChildren: () => import('./components/categories/categories-child/categories.routes')
    .then((m) => m.categoriesRoutes),
    data: {
      getPrerenderParams: () => generatePrerenderParams(194)
    }
  },

  { path: 'contact',
    loadComponent: () => import('./components/contact/contact')
    .then((m) => m.Contact)
  },

  { path: 'login', component: Login },

  { path: 'register', component: Register },

  { path: 'profile', component: Profile, canActivate: [authGuard] },

  { path: 'edit-profile', component: EditProfile, canActivate: [authGuard] },

  { path: 'admin', component: Dashboard, canActivate: [adminGuard] },

  { path: 'admin/dashboard-analytics', component: DashboardAnalytics, canActivate: [adminGuard] },

  { path: 'admin/add-product', component: AddProduct, canActivate: [adminGuard] },

  { path: 'admin/edit-product/:id', component: EditProduct, canActivate: [adminGuard] },

  { path: '**', redirectTo: '' }

];