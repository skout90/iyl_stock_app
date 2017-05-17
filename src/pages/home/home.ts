import { Component, OnInit } from '@angular/core';
import { NavController, Refresher, Platform } from 'ionic-angular';
import { Push, PushToken } from '@ionic/cloud-angular';

import { ScheduleService } from '../../providers';
import { HomeService } from '../../providers';

import { Schedule } from '../../models';
import { SchedulePage } from '../schedule/schedule';

@Component({
    selector: 'page-schedule',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {
    schedules: Schedule[] = [];
    deviceToken: string = 'EMPTY';
    loading: boolean;
    constructor(
        private scheduleService: ScheduleService,
        private homeService: HomeService,
        public nav: NavController,
        public push: Push,
        public platform: Platform
        ) { }

    ionViewDidLoad() {
    }

    ngOnInit() {
        if (this.platform.is('android')) {
            // 푸시 Register
            this.push.register().then((t: PushToken) => {
                return this.push.saveToken(t);
            }).then((t: PushToken) => {
                console.log('Token saved:' + t.token);
                this.deviceToken = t.token;
                this.homeService.insertDeviceToken(t.token).subscribe();
            });

            this.push.rx.notification()
                .subscribe((msg) => {
                    alert(decodeURI(msg.title) + ': ' + decodeURI(msg.text));
                });
        } else {
            console.log('not android');
        }

        this.loading = true;
        const subscription = this.scheduleService.getScheduleList().subscribe(schedules => {
            this.schedules = schedules;
            this.loading = false;
            subscription.unsubscribe();
        }, () => this.loading = false);

    }

    doRefresh(refresher: Refresher) {
        const subscription = this.scheduleService.getScheduleList().subscribe(schedules => {
            this.schedules = schedules;
            refresher.complete();
            subscription.unsubscribe();
        }, () => refresher.complete());
    }

    openSchedule(seqno: number) {
        this.nav.push(SchedulePage, {
            seqno: seqno
        });
    }
}
