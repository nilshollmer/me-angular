import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './model/User';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) {
    }

    onRegisterEvent = new EventEmitter();

    registerUser(email, password) {

        this.http.post<any>(`${environment.dbUrl}register`, { email, password }).subscribe(
            next => {
                this.onRegisterEvent.emit(next["data"]);
            },
            error => {
                this.onRegisterEvent.emit(error["error"].errors);
            });
    }
}
