import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { User } from './model/User';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    // private currentUserSubject: BehaviorSubject<User>;
    // public currentUser: Observable<User>;
    public cUser: User;

    onLoginEvent = new EventEmitter();
    onLogoutEvent = new EventEmitter();

    constructor(private http: HttpClient) {
        // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        // this.currentUser = this.currentUserSubject.asObservable();
    }
    //
    // public get currentUserValue(): User {
    //     return this.currentUserSubject.value;
    // }

    login(email: string, password: string): any {
        this.http.post<any>(`${ environment.dbUrl }login `, { email, password })
            .subscribe(
                next => {
                    this.cUser = new User;
                    localStorage.setItem('token', next["data"].token);
                    localStorage.setItem('user', next["data"].user);
                    this.cUser.email = next["data"].user;
                    this.cUser.token = next["data"].token;
                    this.onLoginEvent.emit(this.cUser);
                },
                error => {
                    this.onLoginEvent.emit(error.message);
                    // this.onLoginEvent.error(error.message);
                }
            );
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.cUser = undefined;
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getUser() {
        return localStorage.getItem('user');
    }
}
