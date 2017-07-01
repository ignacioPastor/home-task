import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    storedData: Map<string, string[]>;
    nWeek: number = 26;
    today: Date;
    numberThisWeek;
    dateWeekInit;
    dateWeekEnd;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        console.log("home----------------------1");
        this.storedData = this.navParams.get("storedData");
        console.log("home----------------------2");
        console.log(this.storedData);
        
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad');
        this.today = new Date();
        this.numberThisWeek = this.getWeek();
        this.dateWeekInit = this.getDateOfWeek(this.numberThisWeek, 2017);
        this.dateWeekEnd = this.getDateOfWeek(this.numberThisWeek, 2017);
        this.dateWeekEnd.setDate(this.dateWeekEnd.getDate() + 6);
    }

    onClickPrev(){
        console.log("onClickPrev()");
    }

    onClickNext(){
        console.log("onClickNext()");
    }

    // Return the number of the current week
    getWeek() {
        var date = new Date();
        date.setHours(0, 0, 0, 0);
        // Thursday in current week decides the year.
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        // January 4 is always in week 1.
        var week1 = new Date(date.getFullYear(), 0, 4);
        // Adjust to Thursday in week 1 and count number of weeks from date to week1.
        return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                            - 3 + (week1.getDay() + 6) % 7) / 7);
    }

    getDateFromWeek() {
        var date = new Date();
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        return date.getFullYear();
    }

    getDateOfWeek(w, y) {
        var d = (1 + (w - 1) * 7); // 1st of January + 7 days for each week
        d++; // error detected in the function, day must be increased in one
        return new Date(y, 0, d);
    }

}
