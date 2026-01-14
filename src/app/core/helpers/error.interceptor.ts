import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {

        if (err.status === 401) {
          console.warn("🔑 Token expiré → tentative refresh auto");
          return throwError(() => err);
        }

        /* if (err.status === 401) {
          // logout local + redirection login
          localStorage.removeItem('token');
          localStorage.removeItem('currentUser');
          this.router.navigate(['/auth']);
        } */

        console.error('❌ Intercepteur - Erreur HTTP :', err);

        const error =
          err?.error?.message ||
          err?.message ||
          err.statusText ||
          'Erreur inconnue';

        return throwError(() => error);
      })
    );
  }
}