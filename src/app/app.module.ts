import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ReportComponent } from './report/report.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReportEditComponent } from './report/report-edit/report-edit.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ReportAddComponent } from './report/report-add/report-add.component';

import { AuthInterceptor } from './_helpers/auth.interceptor'
import { AuthGuard } from './_helpers/auth.guard';

import { ChatService } from './chat.service';

const config: SocketIoConfig = { url: 'https://chatsocket.nilshollmer.me', options: {} };

const appRoutes: Routes = [
    { path : '', component: HomeComponent },
    { path : 'auth/login', component: LoginComponent },
    { path : 'auth/register', component: RegisterComponent },
    { path : 'reports/week/:week', component: ReportComponent},
    { path : 'reports/edit/:week', component: ReportEditComponent, canActivate: [AuthGuard]},
    { path : 'reports/add', component: ReportAddComponent, canActivate: [AuthGuard]},
    { path : '404', component: PageNotFoundComponent },
    { path : '**', redirectTo: '/404'}
];

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    HomeComponent,
    ReportComponent,
    PageNotFoundComponent,
    ReportEditComponent,
    AuthComponent,
    RegisterComponent,
    LoginComponent,
    ReportAddComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
        appRoutes,
        // { enableTracing: true } // debugging
    ),
    NgbModule,
    MarkdownModule.forRoot(),
    SocketIoModule.forRoot(config)
  ],
  providers: [
      ChatService,
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
