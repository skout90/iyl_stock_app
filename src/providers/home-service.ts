import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';

import {CommonTS} from '../app/commonTS';

@Injectable()
export class HomeService {
    constructor(public http: Http) { }
    private baseUrl = CommonTS.BASE_URL;

    insertDeviceToken(deviceToken: string): Observable<Response> {
        return this.http
            .get(this.baseUrl + '/user/insert.do?deviceToken=' + deviceToken);
    }
}
