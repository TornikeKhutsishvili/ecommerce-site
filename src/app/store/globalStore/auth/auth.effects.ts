import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { switchMap, map, catchError, of } from 'rxjs';

@Injectable()
export class AuthEffects {

  actions$ = inject(Actions);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ email, password }) =>
        fakeApiLogin(email, password).pipe(
          map((user) => AuthActions.loginSuccess({ user })),
          catchError((error) =>
            of(AuthActions.loginFailure({ error }))
          )
        )
      )
    )
  );
}

function fakeApiLogin(email: string, password: string) {
  return of({ id: 1, email });
}
