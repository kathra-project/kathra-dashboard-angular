import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import {
  HttpRequest,
  HttpErrorResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class NotAuthorizedInterceptor implements HttpInterceptor {
  
  constructor(
    public auth: KeycloakService
  ) {}
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401) {
          // Redirect to the login route
          this.auth.login();
        }

        if (err.status === 500) {
          // Display custom error message
          if(err.error && err.error.message && err.error.message.includes("openid-connect/userinfo")){
            this.auth.login();
          }
        }
        
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}