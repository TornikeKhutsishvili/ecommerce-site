import { Routes } from '@angular/router';

export const CONTACT_ROUTES: Routes = [

    {
        path: 'contact',
        loadComponent: () => import('./contact')
        .then((m) => m.Contact), title: 'Contact Us',
    }

];