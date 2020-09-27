import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';


import { AuthenticationService } from '../authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authenticationService.getToken();
        
        if (token) {
            request = request.clone({
                setHeaders: {
                    'x-access-token': token
                }
            })
        }
        return next.handle(request);
    }
}
