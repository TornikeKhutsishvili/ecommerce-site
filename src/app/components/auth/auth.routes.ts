import { Routes } from '@angular/router';
import { authGuard } from '../../guards/auth-guard';

export const AUTH_ROUTES: Routes = [

    {
        path: 'login',
        loadComponent: () => import('./login/login')
        .then((m) => m.Login), title: 'Login',
    },

    {
        path: 'register',
        loadComponent: () => import('./register/register')
        .then((m) => m.Register), title: 'Register'
    },

    {
        path: 'profile',
        loadComponent: () => import('./profile/profile')
        .then((m) => m.Profile), title: 'Profile', canActivate: [authGuard]
    },

    {
        path: 'edit-profile',
        loadComponent: () => import('./edit-profile/edit-profile')
        .then((m) => m.EditProfile), title: 'Edit Profile', canActivate: [authGuard]
    },

    {
        path: 'reset-password',
        loadComponent: () => import('./reset-password/reset-password')
        .then((m) => m.ResetPassword), title: 'Reset Password', canActivate: [authGuard]
    }

];