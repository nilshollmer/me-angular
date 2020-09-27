import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ReportService } from '../report.service';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
    public isMenuCollapsed = true;

    allReports = [];

    private reportSubscription: Subscription;


    constructor(
        private router: Router,
        private reportService: ReportService
    ) { }
    //
    // loadReports() {
    //     this.allReports = [];
    //     this.reportService.getAllReports().subscribe(
    //         (next) => {
    //
    //
    //             Object.entries(next["data"]).forEach(element => {
    //                 console.log(element[1].week);
    //                 this.allReports.push(element[1].week);
    //             });
    //             console.log(this.allReports)
    //         }
    //     );
    //
    // }
    ngOnInit(): void {
        // this.loadReports();
        // this.reportSubscription = this.reportService.onReportCreateEvent.subscribe(
        //     (next) => {
        //         this.loadReports();
        //     }
        // )
    }

    ngOnDestroy(): void {
        this.reportSubscription.unsubscribe();
    }
}
