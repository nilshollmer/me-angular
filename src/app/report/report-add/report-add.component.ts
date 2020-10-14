import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ReportService } from '../../report.service';
import { AuthenticationService } from '../../authentication.service';
import { Report } from '../../model/Report';

@Component({
  selector: 'app-report-add',
  templateUrl: './report-add.component.html',
  styleUrls: ['./report-add.component.css'],
  providers: [ ReportService ]
})
export class ReportAddComponent implements OnInit, OnDestroy {
    @Input()
    week: String;
    title: String;
    data: String;
    error: String;

    private createReportSubscription: Subscription;

    constructor(
        private reportService: ReportService,
        private authService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    initializeForm() {

    }
    ngOnInit(): void {
        this.createReportSubscription = this.reportService.onReportCreateEvent.subscribe(
            (response) => {
                console.log(response);
                if (response.status === 201) {
                    console.log(response);
                    this.router.navigate(['reports', 'week', this.week]);
                } else {
                    this.error = response.detail;
                }
            }
        )
    }

    ngOnDestroy() {
        this.createReportSubscription.unsubscribe();
    }

    saveReport() {
        const body = {
            week: this.week,
            title: this.title,
            data: this.data
        }
        this.reportService.createReport(body);
    }
}
