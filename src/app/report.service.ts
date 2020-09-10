import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Report } from './model/Report';

const reports = {
    1: 'kmom01.md',
    2: 'kmom02.md',
};

@Injectable({
  providedIn: 'root'
})
export class ReportService {
    constructor(private http: HttpClient) {}

    fetchReport(kmom) {
        console.log(this.http.get("/assets/reports/" + reports[kmom], {responseType: 'text'}));
        return this.http.get("/assets/reports/" + reports[kmom], {responseType: 'text'});
        // console.log(this.http.get<Report>("data/" + reports[kmom]));
        // return this.http.get<Report>("data/" + kmom);
    }
}
