import { Routes } from '@angular/router';

// get products id
function generatePrerenderParams(count: number): { id: string }[] {
  return Array.from({ length: count }, (_, i) => ({ id: (i + 1).toString() }));
}

export const routes: Routes = [

  { path: '',
    loadComponent: () => import('./components/home/home').then((m) => m.Home)
  },

  { path: 'home',
    loadComponent: () => import('./components/home/home').then((m) => m.Home)
  },

  { path: 'products',
    loadComponent: () => import('./components/products/product-list/product-list').then((m) => m.ProductList)
  },

  { path: 'product/:id',
    loadComponent: () => import('./components/products/product-details/product-details').then((m) => m.ProductDetails),
    data: {
      getPrerenderParams: () => generatePrerenderParams(30)
    }
  },

  { path: 'cart',
    loadComponent: () => import('./components/cart/cart').then((m) => m.Cart)
  },

  { path: 'checkout',
    loadComponent: () => import('./components/checkout/checkout').then((m) => m.Checkout)
  },

  { path: 'about',
    loadComponent: () => import('./components/about/about').then((m) => m.About)
  },

  { path: 'shop',
    loadComponent: () => import('./components/shop/shop').then((m) => m.Shop)
  },

  { path: 'contact',
    loadComponent: () => import('./components/contact/contact').then((m) => m.Contact)
  },

  { path: 'login',
    loadComponent: () => import('./components/auth/login/login').then((m) => m.Login)
  },

  { path: 'register',
    loadComponent: () => import('./components/auth/register/register').then((m) => m.Register)
  },

  { path: 'profile',
    loadComponent: () => import('./components/auth/profile/profile').then((m) => m.Profile)
  },

  { path: 'edit-profile',
    loadComponent: () => import('./components/auth/edit-profile/edit-profile').then((m) => m.EditProfile)
  },

  { path: '**', redirectTo: '' }

];
