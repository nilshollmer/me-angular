import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ReportService } from '../../report.service';
import { AuthenticationService } from '../../authentication.service';
import { Report } from '../../model/Report';

@Component({
  selector: 'app-report-edit',
  templateUrl: './report-edit.component.html',
  styleUrls: ['./report-edit.component.css'],
  providers: [ ReportService ]

})
export class ReportEditComponent implements OnInit, OnDestroy {
    @Input()
    week: number;
    title: string;
    data: string;

    private loadDataSubscription: Subscription;
    private updateReportSubscription: Subscription;

    constructor(
        private reportService: ReportService,
        private authService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadData();
        this.updateReportSubscription = this.reportService.onReportUpdateEvent.subscribe(
            (response) => {
                console.log(response);
                this.router.navigate(['reports', 'week', response]);
            }
        );
    }

    ngOnDestroy() {
        this.loadDataSubscription.unsubscribe();
        this.updateReportSubscription.unsubscribe();
    }

    loadData() {
        this.loadDataSubscription = this.route.params.subscribe(params => {
            this.week = params['week'];
            console.log(this.week);
            this.reportService.getReport(this.week)
                .subscribe(next => {
                    console.log(next);
                    this.week = next.data["week"];
                    this.title = next.data["title"];
                    this.data = next.data["data"];
                }, error => {
                    console.log(error);
                });
        });
    }

    saveReport() {
        const body = {
            week: this.week,
            title: this.title,
            data: this.data
        }
        this.reportService.updateReport(body);
    }
}
