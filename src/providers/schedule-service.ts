import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { Schedule } from '../models';
import { CommonTS } from '../app/commonTS';

@Injectable()
export class ScheduleService {
    constructor(public http: Http) { }
    private baseUrl = CommonTS.BASE_URL;

    getScheduleList(): Observable<Schedule[]> {
        return this.http
            .get(this.baseUrl + '/schedule/list.do')
            .map((res: Response) => res.json());
    }

    getSchedule(seqno): Observable<Schedule> {
        console.log(this.baseUrl + '/schedule/' + seqno);
        return this.http
            .get(this.baseUrl + '/schedule/' + seqno)
            .map((res: Response) => res.json());
    }
}
