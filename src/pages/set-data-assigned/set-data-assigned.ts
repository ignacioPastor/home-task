import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';

import { TaskDistribution } from "./../../models/TaskDistribution";
import { HomePage } from "./../home/home";


@IonicPage()
@Component({
	selector: 'set-data-assigned',
	templateUrl: 'set-data-assigned.html',
})
export class SetDataAssigned {

	@ViewChild('focusInput') myInput ;

  	taskDistribution: TaskDistribution;
	myTask: string = "";
	myHomemate: string = "";
	errorInfo: string = "";
	numberThisWeek: number;

	constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private keyboard: Keyboard) {
		this.taskDistribution = new TaskDistribution(null);
	}

	// lifeCicleFunction, enter when all contents has been charged
	ionViewDidLoad() {
		this.numberThisWeek = this.getWeek();
	}

	// remove the las content added to the taskDistribution
	onClickLess(){
		this.taskDistribution.tasks.pop();
		this.taskDistribution.houseMates.pop();
	}

	// add current content, and prepare the data to add another content
	onClickMore(){
		if(this.addContent(true))
			this.putInput();
	}

	// onClick finnish, store data and change window
	finnish(){
		this.addContent(false);
		if(this.taskDistribution.houseMates.length == 0){
			this.errorInfo = "Fill content";
		}else{
			this.assignWeekOneDistribution(this.taskDistribution.houseMates.slice());
			
			this.storage.set('taskDistribution', this.taskDistribution);
			this.navCtrl.push(HomePage, {taskDistribution: this.taskDistribution});
		}
	}

	// Calculate the distribution of week one to get the current distribution in the current week
	// check if the houseMates array order from current distribution as week 1 get to this week the desired distribution
	assignWeekOneDistribution(myArrayControl: string[]){
		if(this.sameOrder(myArrayControl,
				this.rotate(this.taskDistribution.houseMates.slice(), this.numberThisWeek - 1))){
			return true;
		}else{
			this.rotate(this.taskDistribution.houseMates, 1);
			this.assignWeekOneDistribution(myArrayControl);
		}
	}

	sameOrder(a: string[], b: string[]): Boolean{
		for(let i=0; i<a.length; i++){
			if(a[i] != b[i]) return false;
		}
		return true;
	}

	rotate(a: string[], n: number){
		for(let i=0; i<n; i++){
			a.unshift(a.pop());
		}
		return a;
	}

	// if there are no errors, add the new task and the new houseMate
	// return true if content added
	addContent(notifyError: Boolean): Boolean{
		if(this.checkErrors()){
			this.taskDistribution.houseMates.push(this.myHomemate);
			this.taskDistribution.tasks.push(this.myTask);
			this.myHomemate = "";
			this.myTask = "";
			return true;
		}else{
			if(notifyError) this.errorInfo = "Fill the content";
			return false;
		}
	}

	// check that task and homemate has been filled
	checkErrors(): Boolean{
		if(this.myTask == "") return false;
		if(this.myHomemate == "") return false;
		return true;
	}

	// onFocus in input to enter a new task or new homemate, clean the error message
	onFocusInput(){
		this.errorInfo = "";
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

	putInput(){
		//https://stackoverflow.com/questions/39612653/set-focus-on-an-input-with-ionic-2
			this.myInput.setFocus();
			this.keyboard.show(); // for android
	}

}


// // dev mode
//     private storeData(){
// 		// let myTasks: string[] = ["task_1"];
// 		// let myHouseMates: string[] = ["homemate_1"];
		
// 		// let myTasks: string[] = ["task_1", "task_2"];
// 		// let myHouseMates: string[] = ["homemate_1", "homemate_2"];

// 		// let myTasks: string[] = ["task_1", "task_2", "task_3"];
// 		// let myHouseMates: string[] = ["homemate_1", "homemate_2", "homemate_3"];

// 		// let myTasks: string[] = ["task_1", "task_2", "task_3", "task_4"];
// 		// let myHouseMates: string[] = ["homemate_1", "homemate_2", "homemate_3", "homemate_4"];

// 		// let myTasks: string[] = ["task_1", "task_2", "task_3", "task_4", "task_5"];
// 		// let myHouseMates: string[] = ["homemate_1", "homemate_2", "homemate_3", "homemate_4", "homemate_5"];

// 		// let myTasks: string[] = ["task_1", "task_2", "task_3", "task_4", "task_5", "task_6"];
// 		// let myHouseMates: string[] = ["homemate_1", "homemate_2", "homemate_3", "homemate_4", "homemate_5", "homemate_6"];

// 		// let myTasks: string[] = ["task_1", "task_2", "task_3", "task_4", "task_5", "task_6", "task_7"];
// 		// let myHouseMates: string[] = ["homemate_1", "homemate_2", "homemate_3", "homemate_4", "homemate_5", "homemate_6", "homemate_7"];

// 		// let myTasks: string[] = ["task_1", "task_2", "task_3", "task_4", "task_5", "task_6", "task_7", "task_8"];
// 		// let myHouseMates: string[] = ["homemate_1", "homemate_2", "homemate_3", "homemate_4", "homemate_5", "homemate_6", "homemate_7", "homemate_8"];

// 		// let myTasks: string[] = ["task_1", "task_2", "task_3", "task_4", "task_5", "task_6", "task_7", "task_8", "task_9"];
// 		// let myHouseMates: string[] = ["homemate_1", "homemate_2", "homemate_3", "homemate_4", "homemate_5", "homemate_6", "homemate_7", "homemate_8", "homemate_9"];

// 		let myTasks: string[] = ["task_1", "task_2", "task_3", "task_4", "task_5", "task_6", "task_7", "task_8", "task_9", "task_10"];
// 		let myHouseMates: string[] = ["homemate_1", "homemate_2", "homemate_3", "homemate_4", "homemate_5", "homemate_6", "homemate_7", "homemate_8", "homemate_9", "homemate_10"];

// 		this.taskDistribution = new TaskDistribution({tasks: myTasks, houseMates: myHouseMates});
// 	}
