import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = this.authService.getToken();

        if (token) {
            return true;
        }

        this.router.navigate(['auth','login']);
        return false;
        }
    // canActivate(
    //     next: ActivatedRouteSnapshot,
    //     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //         return true;
    //     }

}
