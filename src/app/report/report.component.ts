import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
    // reports: <Report>;

    @Input()
    kmom = 0;

    data: object;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.kmom = params['kmom'];
        });

    }

    setCurrentWeek(week) {
        this.kmom = week;
    }
}
