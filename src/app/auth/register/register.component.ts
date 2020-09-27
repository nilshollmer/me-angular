import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    @Input()
    email: string;
    password: string;
    verifyPassword: string;
    passwordsMatch: false;
    error: string;

    constructor(private userService: UserService) { }

    ngOnInit(): void {
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
