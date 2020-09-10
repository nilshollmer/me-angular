import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ReportListComponent } from './report-list/report-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReportDetailsComponent } from './report-details/report-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const appRoutes: Routes = [
    { path : '', component: HomeComponent },
    { path : 'reports/week/:week', component: ReportListComponent},
    { path : 'reports/week/:week/:title', component: ReportDetailsComponent, data: { week: ':week', title: ':title'} },
    { path : '404', component: PageNotFoundComponent },
    { path : '**', redirectTo: '/404'}
];

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    HomeComponent,
    ReportListComponent,
    ReportDetailsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
        appRoutes,
        // { enableTracing: true } // debugging
    ),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
