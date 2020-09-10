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
    currentWeek = 0;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.currentWeek = params['week'];
        });

    }

    setCurrentWeek(week) {
        this.currentWeek = week;
    }
}
