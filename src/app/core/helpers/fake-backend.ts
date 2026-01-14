import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  /* ➜  TOKEN unique pour toute la session */
  private readonly FAKE_TOKEN =
    localStorage.getItem('token') ||
    'fake-jwt-token-' + Math.random().toString(36).slice(2);

  constructor() {
    localStorage.setItem('token', this.FAKE_TOKEN);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    /* 1.  Tableau FORCÉ en dur (le temps du test) */
    let users: any[] = [
      { id: 1, username: 'admin', email: 'admin@osisgroup.com', password: '123456' }
    ];

    /* 2.  Helper : normalisation */
    const clean = (s: string) => (s || '').toString().trim().toLowerCase();

    return of(null).pipe(
      mergeMap(() => {
        /* ---------- LOGIN ---------- */
        if (
          request.url.endsWith('users/authenticate') &&
          request.method === 'POST'
        ) {
          const { email, password } = request.body;
          console.log('🔍 FakeBackend reçoit :', { email, password });
          console.log('🔍 Users connus :', users);

          const found = users.find(
            u =>
              clean(u.email) === clean(email) &&
              u.password === (password || '').toString().trim()
          );

          if (!found) {
            console.warn('❌ FakeBackend : identifiants incorrects');
            return throwError({
              status: 400,
              error: { message: 'Username or password is incorrect' }
            });
          }

          const body = { ...found, token: this.FAKE_TOKEN };
          return of(new HttpResponse({ status: 200, body }));
        }

        /* ---------- ROUTES PROTÉGÉES ---------- */
        const hasAuth = !!request.headers.get('Authorization');
        if (
          (request.url.endsWith('/users') ||
            request.url.endsWith('/users/register') ||
            request.url.match(/\/users\/\d+$/)) &&
          !hasAuth
        ) {
          return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        /* ---------- GET USERS ---------- */
        if (request.url.endsWith('/users') && request.method === 'GET') {
          return of(new HttpResponse({ status: 200, body: users }));
        }

        /* ---------- REGISTER ---------- */
        if (
          request.url.endsWith('/users/register') &&
          request.method === 'POST'
        ) {
          const newUser = { ...request.body, id: users.length + 1 };
          users.push(newUser);
          return of(new HttpResponse({ status: 200 }));
        }

        /* ---------- DELETE USER ---------- */
        if (request.method === 'DELETE' && request.url.match(/\/users\/\d+$/)) {
          const id = +request.url.split('/').pop()!;
          const idx = users.findIndex(u => u.id === id);
          if (idx !== -1) users.splice(idx, 1);
          return of(new HttpResponse({ status: 200 }));
        }

        /* ---------- PASS THROUGH ---------- */
        return next.handle(request);
      }),
      materialize(),
      delay(500),
      dematerialize()
    );
  }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};