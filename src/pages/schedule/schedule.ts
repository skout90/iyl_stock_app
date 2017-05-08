import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { NavParams } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';

import { ScheduleService } from '../../providers';
import { Schedule } from '../../models';

@Component({
    selector: 'page-schedule',
    templateUrl: 'schedule.html'
})
export class SchedulePage implements OnInit {
    @ViewChild('scheduleContents') scheduleContents: ElementRef;

    schedule: Schedule;

    constructor(
        private scheduleService: ScheduleService,
        public navParams: NavParams
        ) { }

    ngOnInit() {
        this.scheduleService
            .getSchedule(this.navParams.get('seqno'))
            .toPromise()
            .then(schedule => this.schedule = schedule)
            .then(schedule => this.scheduleContents.nativeElement.innerHTML = schedule.contents);
    }
}
