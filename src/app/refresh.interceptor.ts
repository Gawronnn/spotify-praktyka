import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { LoginService } from './services/login.service';
import { TokenResponse } from './interfaces/token-response';

@Injectable({
  providedIn: 'root',
})
export class RefreshInterceptor implements HttpInterceptor {
  constructor(private _loginService: LoginService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (
          error.status === 401 &&
          request.url !== 'https://accounts.spotify.com/api/token'
        ) {
          return this.handle401Error(request, next);
        }
        return throwError(() => error);
      })
    );
  }

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this._loginService.getRefreshToken().pipe(
      switchMap((tokenResponse: TokenResponse) => {
        localStorage.setItem('token', tokenResponse.access_token);
        localStorage.setItem('refresh_token', tokenResponse.refresh_token);
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });
        return next.handle(request);
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
