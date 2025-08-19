import { Routes } from '@angular/router';
import { adminGuard } from '../../guards/admin-guard';

export const ADMIN_ROUTES: Routes = [

    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },

    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard')
        .then(m => m.Dashboard), title: 'Dashboard', canActivate: [adminGuard]
    },

    {
        path: 'dashboard-analytics',
        loadComponent: () => import('./dashboard-analytics/dashboard-analytics')
        .then((m) => m.DashboardAnalytics), title: 'Dashboard-analytics', canActivate: [adminGuard]
    },

    {
        path: 'add-product',
        loadComponent: () => import('./add-product/add-product')
        .then((m) => m.AddProduct), title: 'Add-product', canActivate: [adminGuard]
    },

    {
        path: 'edit-product/:id',
        loadComponent: () => import('./edit-product/edit-product')
        .then((m) => m.EditProduct), title: 'Edit-profile', canActivate: [adminGuard]
    }

];