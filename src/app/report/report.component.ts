import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from '../report.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
    @Input()
    kmom = 0;
    data: string;
    private subscription: any;

    constructor(private reportService: ReportService,
        private route: ActivatedRoute) { }

    ngOnInit(): void {
        // console.log(this.reportService.reports);
        this.subscription = this.route.params.subscribe(params => {
            this.kmom = params['kmom'];
            this.reportService.fetchReport(this.kmom)
                .subscribe((data) => {
                    this.data = data;
                });
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
