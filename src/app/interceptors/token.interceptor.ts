import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';
import { AuthenticatedResponse } from '../models/authenticatedresponse';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private route: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();

    if (myToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${myToken}` }
      })
    }
    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            return this.handleUnAuthorizedError(request, next);
          }
        }
        return throwError(() => err)
      })
    );
  }

  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler) {
    let authResponse = new AuthenticatedResponse();
    authResponse.accessToken = this.auth.getToken()!;
    authResponse.refreshToken = this.auth.getRefreshToken()!;
    authResponse.userId = Number(localStorage.getItem('userid'));
    return this.auth.renewToken(authResponse)
      .pipe(
        switchMap((data: AuthenticatedResponse) => {
          this.auth.storeToken(data.accessToken);
          this.auth.storeRefreshToken(data.refreshToken);
          req = req.clone({
            setHeaders: { Authorization: `Bearer ${data.accessToken}` }
          })
          return next.handle(req);
        }),
        catchError((err) => {
          return throwError(() => {
            console.log('TOKEN EXPIRED');
            this.route.navigate(['/login'])
          })
        })
      )
  }
}
