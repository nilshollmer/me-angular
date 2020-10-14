import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ReportService } from '../report.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit, OnDestroy {
    @Input()
    week: number;
    title: string;
    data: string;
    error: {
        title: "No report found",
        data: "Sorry, something was not right in you request."
    };

    private subscription: Subscription;

    constructor(
        private reportService: ReportService,
        private route: ActivatedRoute
    ) { }

    loadData() {
        this.subscription = this.route.params.subscribe(params => {
            this.week = params['week'];
            this.reportService.getReport(this.week)
                .subscribe(next => {
                    this.week = next.data["week"];
                    this.title = next.data["title"];
                    this.data = next.data["data"];
                }, error => {
                    console.log(error);
                });
        });
    }

    ngOnInit(): void {
        this.loadData();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
