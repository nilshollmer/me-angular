import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '../../authentication.service';
import { User } from '../../model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ AuthenticationService ]
})
export class LoginComponent implements OnInit, OnDestroy {
    @Input()
    email: string;
    password: string;
    currentUser: string;

    loginSubscription: Subscription;
    // logoutSubscription: Subscription;

    constructor(
        private authService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    initializeForm() {
        this.currentUser = this.authService.getUser();
        this.loginSubscription = this.authService.onLoginEvent.subscribe(
            (user) => {
                if (user instanceof User) {
                    // this.currentUser = user;
                    this.currentUser = this.authService.getUser();
                    console.log(this.currentUser);
                }
                console.log(user);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    ngOnInit(): void {
        this.initializeForm();
    }

    ngOnDestroy(): void {
        this.loginSubscription.unsubscribe();
    }

    login() {
        this.authService.login(this.email, this.password);
    }

    logout() {
        this.currentUser = undefined;
        this.authService.logout();
        this.email = "",
        this.password = "";
    }
}
