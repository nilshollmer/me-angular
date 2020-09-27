import { Component, ViewChild } from '@angular/core';

import { LoginComponent } from './auth/login/login.component';
import { ReportComponent } from './report/report.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Me | JSramverk';
}
