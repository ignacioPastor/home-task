import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TaskDistribution } from "./../../models/TaskDistribution";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    taskDistribution: TaskDistribution;  // map where stored the two array with data
    today: Date;
    numberThisWeek; // number of current week
    dateWeekInit;  // date of Monday current week
    dateWeekEnd;    // date of Sunday current week
    variationWeek: number = 0;  // manage if we are showing the next or following weeks (+1 and so on), or previous week (-1 and so on)

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        console.log("homeConstructor--------------------1");
        this.taskDistribution = this.navParams.get("storedData");
        console.log("homeConstructor--------------------2");
        console.log(this.taskDistribution);
    }

    // lifeCicle, enters on view load
    ionViewDidLoad() {
        this.today = new Date();
        this.numberThisWeek = this.getWeek();   // get the number of current week
        this.rotateTask(this.numberThisWeek - 1 + this.variationWeek);   // Asign the rotation to this week considering the asignation of week number 1
        this.showPeriodWeek();
    }

    // show the date of monday and the date of sunday of current week
    showPeriodWeek(){
        this.dateWeekInit = this.getDateOfWeek(this.numberThisWeek + this.variationWeek, this.today.getFullYear());
        this.dateWeekEnd = this.getDateOfWeek(this.numberThisWeek  + this.variationWeek, this.today.getFullYear());
        this.dateWeekEnd.setDate(this.dateWeekEnd.getDate() + 6);
    }

    // iterate "n" times the tasks in adequate direction
    rotateTask(n: number){
        let positive: Boolean = true;
        if(n < 0){
            n*=-1;
            positive = false;
        }
        for(let i=0; i<n; i++){
            if(positive)
                this.taskDistribution.houseMates.unshift(this.taskDistribution.houseMates.pop());
            else
                this.taskDistribution.houseMates.push(this.taskDistribution.houseMates.shift());
        }
    }

    // onClick in next button show the distribution to the previous week to shown week
    onClickPrev(){
        this.variationWeek--;
        this.rotateTask(-1);
        this.showPeriodWeek();
    }

    // onClick in next button show the distribution to the next week to shown week
    onClickNext(){
        this.variationWeek++;
        this.rotateTask(1);
        this.showPeriodWeek();
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

    // get the date of monday of given week "w" of given year "y"
    getDateOfWeek(w, y) {
        var d = (1 + (w - 1) * 7); // 1st of January + 7 days for each week
        d++; // error detected in the function, day must be increased in one
        return new Date(y, 0, d);
    }

}
