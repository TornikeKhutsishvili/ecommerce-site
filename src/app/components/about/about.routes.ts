import { Routes } from '@angular/router';

export const ABOUT_ROUTES: Routes = [

    {
        path: '',
        loadComponent: () => import('./about')
        .then(m => m.About), title: 'About'
    }

];