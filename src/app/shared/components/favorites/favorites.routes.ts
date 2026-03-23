import { Routes } from '@angular/router';
import { authGuard } from '../../../core/guards/auth-guard';

export const FAVORITES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./favorites').then((m) => m.Favorites),
    title: 'Favorites', canActivate: [authGuard]
  },
];
