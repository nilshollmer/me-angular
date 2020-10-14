import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders     } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Report } from './model/Report';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
    url = environment.dbUrl;

    onReportUpdateEvent = new EventEmitter();
    onReportCreateEvent = new EventEmitter();

    getReport(week): Observable<Report> {
        return this.http.get<Report>(`${ environment.dbUrl }reports/week/${week}`);
    }

    getAllReports() {
        return this.http.get(`${ environment.dbUrl }reports`);
    }

    updateReport(body) {
        this.http.post<any>(`${ environment.dbUrl }reports/edit`, body)
            .subscribe(
                (next) => {
                    console.log(next)
                    this.onReportUpdateEvent.emit(body.week);
                },
                (error) => {
                    console.log(error)
                }
            );
    }

    createReport(body) {
        this.http.post<any>(`${ environment.dbUrl }reports/add`, body)
            .subscribe(
                (next) => {
                    console.log("1")
                    this.onReportCreateEvent.emit(next["data"]);
                },
                (error) => {
                    this.onReportCreateEvent.emit(error["error"].errors);
                }
            );
    }

    constructor(private http: HttpClient) {

    }
}
