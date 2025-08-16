import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  } else {
    router.navigate(
      ['/auth/login'],
      { queryParams: { returnUrl: state.url } }
    );
    return false;
  }

};