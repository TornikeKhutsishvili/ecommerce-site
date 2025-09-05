import { Routes } from '@angular/router';

export const RULES_ROUTES: Routes = [

  {
    path: 'policy',
    loadChildren: () => import('./policy/policy.routes')
    .then(m => m.POLICY_ROUTES), title: 'Policy'
  },

  {
    path: 'terms',
    loadChildren: () => import('./terms/terms.routes')
    .then(m => m.TERMS_ROUTES), title: 'Terms'
  }

];