import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '../../authentication.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

    @Input()
    email: string;
    password: string;
    verifyPassword: string;
    passwordsMatch: false;
    error: string;

    registerSubscription: Subscription;

    constructor(
        private userService: UserService,
        private authService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.registerSubscription = this.userService.onRegisterEvent.subscribe(
            (response) => {
                console.log(response.status)
                if (response.status === 201) {
                    this.router.navigate(['auth', 'login']);
                } else if (response.status === 500) {
                    this.error = response.detail;
                    console.log(this.error);
                }
            }
        );
    }

    ngOnDestroy(): void {
        this.registerSubscription.unsubscribe();
    }


    registerUser() {
        if (!this.email) {
            alert("Enter an email adress")
            return;
        } else if (!this.password) {
            alert("Enter a password")
            return;
        } else if (this.password !== this.verifyPassword) {
            alert("Passwords must match")
            return;
        }
        this.userService.registerUser(this.email, this.password);
    }
}
