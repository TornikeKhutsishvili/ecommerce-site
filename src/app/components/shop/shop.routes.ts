import { Routes } from '@angular/router';

export const SHOP_ROUTES: Routes = [

    {
        path: 'shop',
        loadComponent: () => import('./shop')
        .then(m => m.Shop), title: 'Shop'
    }

];