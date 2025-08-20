import {
  Router,
  CanActivateFn
} from '@angular/router';

import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';

export const adminGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn() && auth.isAdmin()) {
    return true;
  } else {
    router.navigate(
      ['/'],
      { queryParams: { returnUrl: state.url } }
    );
    return false;
  }

};
