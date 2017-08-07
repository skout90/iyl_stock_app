import {Component} from '@angular/core';
import {NavController, Refresher, Platform, ToastController} from 'ionic-angular';
import {Push, PushToken} from '@ionic/cloud-angular';
import {Storage} from '@ionic/storage';

import {ScheduleService} from '../../providers';
import {HomeService} from '../../providers';

import {Schedule} from '../../models';
import {SchedulePage} from '../schedule/schedule';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    schedules: Schedule[] = [];
    loading: boolean;
    isPush: boolean;

    constructor(private scheduleService: ScheduleService,
                private homeService: HomeService,
                private storage: Storage,
                private toastController: ToastController,
                public nav: NavController,
                public push: Push,
                public platform: Platform) {

        // 푸시 Register
        if (this.platform.is('android')) {
            this.push.register().then((t: PushToken) => {
                return this.push.saveToken(t);
            }).then((t: PushToken) => {
                this.homeService.insertDeviceToken(t.token).subscribe();
            });

            this.push.rx.notification()
                .subscribe((msg) => {
                    // 푸시 토스트 메세지
                    let toast = this.toastController.create({
                        message: decodeURI(msg.text),
                        duration: 3000,
                        position: 'bottom'
                    });
                    toast.present();
                });
        } else {
            console.log('not android');
        }

        // 푸시 여부 체크
        this.storage.get('isPush').then((isPush) => {
            if (isPush === null) {
                this.isPush = true;
                storage.set('isPush', true);
            } else {
                this.isPush = isPush;
            }
        });
    }

    onChange() {
        if (this.platform.is('android')) {
            // 푸시 ON/OFF
            if (this.isPush === true) {
                this.push.register().then((t: PushToken) => {
                    return this.push.saveToken(t);
                }).then((t: PushToken) => {
                    this.homeService.insertDeviceToken(t.token).subscribe();
                });
            } else {
                this.push.unregister();
            }
        }
        // 푸시 설정을 저장합니다.
        this.storage.set('isPush', this.isPush);

        // 푸시 On/Off Toast Message
        let toast = this.toastController.create({
            message: '푸시 ' + (this.isPush === true ? 'ON' : 'OFF') + '!!!!',
            duration: 2000,
            position: 'bottom'
        });
        toast.present();
    }

    ionViewDidEnter() {
        this.loading = true;
        const subscription = this.scheduleService.getScheduleList().subscribe(schedules => {
            this.schedules = schedules;
            this.loading = false;
            subscription.unsubscribe();
        }, () => this.loading = false);

    }

    doRefresh(refresher: Refresher) {
        this.loading = true;
        const subscription = this.scheduleService.getScheduleList().subscribe(schedules => {
            this.schedules = schedules;
            refresher.complete();
            this.loading = false;
            subscription.unsubscribe();
        }, () => refresher.complete());
    }

    openSchedule(seqno: number) {
        this.nav.push(SchedulePage, {
            seqno: seqno
        });
    }
}
