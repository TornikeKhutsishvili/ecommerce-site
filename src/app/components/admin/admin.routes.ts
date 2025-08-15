import { Routes } from '@angular/router';
import { adminGuard } from '../../guards/admin-guard';

export const ADMIN_ROUTES: Routes = [

    {
        path: 'admin/dashboard',
        loadComponent: () => import('./dashboard/dashboard')
        .then(m => m.Dashboard), title: 'Login', canActivate: [adminGuard]
    },

    {
        path: 'admin/dashboard-analytics',
        loadComponent: () => import('./dashboard-analytics/dashboard-analytics')
        .then((m) => m.DashboardAnalytics), title: 'Dashboard-analytics', canActivate: [adminGuard]
    },

    {
        path: 'admin/add-product',
        loadComponent: () => import('./add-product/add-product')
        .then((m) => m.AddProduct), title: 'Add-product', canActivate: [adminGuard]
    },

    {
        path: 'admin/edit-product/:id',
        loadComponent: () => import('./edit-product/edit-product')
        .then((m) => m.EditProduct), title: 'Edit-profile', canActivate: [adminGuard]
    }

];