import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SchedulePage } from '../pages/schedule/schedule';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = HomePage;
    private pages = {};
    @ViewChild(Nav) nav: Nav;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
        this.pages = {
            'HomePage': HomePage,
            'SchedulePage': SchedulePage
        };
    }

    openPage(pageName) {
        const component = this.pages[pageName];
        if (!component) {
            return;
        }
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(component);
    }
}


// WEBPACK FOOTER //
// ./src/app/app.component.ts


// WEBPACK FOOTER //
// ./src/app/app.component.ts