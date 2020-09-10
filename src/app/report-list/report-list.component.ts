import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { reports } from '../reports';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
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
