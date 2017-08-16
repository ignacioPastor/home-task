import { Component } from '@angular/core';
import { NavController, NavParams, Platform, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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

    constructor(private platform: Platform, public navCtrl: NavController, public navParams: NavParams, 
            public events: Events, private storage: Storage) {
        this.taskDistribution = new TaskDistribution(this.navParams.get("taskDistribution"));
        
        this.events.subscribe('taskDistributionChanged', () => {
            this.chargeDistribution();
          });

        // if this is the main window, goBack means close the app
        this.platform.registerBackButtonAction(() => {
            if(this.navCtrl.getActive().component == HomePage) {
                this.platform.exitApp();
            }
            else {
                this.navCtrl.pop();
            }
        });
        
    }

    async chargeDistribution(){
        this.taskDistribution = new TaskDistribution(await this.storage.get("taskDistribution"));
        this.displayData();
    }

    // lifeCicle, enters on view load
    ionViewDidLoad() {
        this.displayData();
    }

    displayData(){
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
    // adjust the houseMatesToShow
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
        this.taskDistribution.setAdjustedHouseMates();
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
        let nWeek = 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                            - 3 + (week1.getDay() + 6) % 7) / 7);
        
        // To if the week starts on sunday, the 
        // nWeek = this.taskDistribution.sunday ? nWeek + 1 : nWeek;
        if(this.taskDistribution.sunday){
            let newToday = new Date();
            let dayNumber = newToday.getDay();
            nWeek = dayNumber == 0 ? nWeek + 1 : nWeek;

        }
        return nWeek;
    }

    // get the date of monday of given week "w" of given year "y"
    getDateOfWeek(w, y) {
        var d = (1 + (w - 1) * 7); // 1st of January + 7 days for each week
       // d++; // error detected in the function, day must be increased in one

        // If the week starts on monday day must be increased by one
        d = this.taskDistribution.sunday ? d : d + 1;

        return new Date(y, 0, d);
    }

    // dev mode
    private storeData(){
		let myTasks: string[] = ["task_1", "task_2", "task_3", "task_4", "task_5", "task_6"];
		let myHouseMates: string[] = ["homemate_1", "homemate_2", "homemate_3"];
		this.taskDistribution = new TaskDistribution({tasks: myTasks, houseMates: myHouseMates});
    }
    
    getDateWeekInit(){
        return this.dateWeekInit;
    }

    getDateWeekEnd(){
        return this.dateWeekEnd;
    }

    testHome(){
        console.log("");
        console.log("testHome");
        console.log("this.taskDistribution");
        console.log(this.taskDistribution);
    }
    

}
