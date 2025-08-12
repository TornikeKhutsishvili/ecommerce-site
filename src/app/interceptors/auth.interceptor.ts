import {
    inject,
    Injectable
} from '@angular/core';

import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpErrorResponse,
} from '@angular/common/http';

import {
    Observable,
    throwError
} from 'rxjs';

import {
    catchError,
    switchMap
} from 'rxjs/operators';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private authService = inject(AuthService);
  private router = inject(Router);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const accessToken = this.authService.getAccessToken();

    let authReq = req;
    if (accessToken) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.authService.refreshToken().pipe(
            switchMap(() => {
              const newToken = this.authService.getAccessToken();
              const newReq = req.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` },
              });
              return next.handle(newReq);
            }),
            catchError(() => {
              this.authService.logout();
              this.router.navigate(['/login']);
              return throwError(() => error);
            })
          );
        }
        return throwError(() => error);
      })
    );

  }

}