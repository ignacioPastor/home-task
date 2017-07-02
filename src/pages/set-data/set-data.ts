import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Nav, Platform } from 'ionic-angular';

import { TaskDistribution } from "./../../models/TaskDistribution";

import { HomePage } from "./../home/home";


@IonicPage()
@Component({
	selector: 'set-data',
	templateUrl: 'set-data.html',
})
export class SetData {

	taskDistribution: TaskDistribution;
	arrayData: string[] = []; // take the data entered by the user
	mode: string = "homemate";
	myData: string = "";
	errorInfo: string = "";

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		console.log("constructor ser-data");
		this.taskDistribution = new TaskDistribution(null);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SetData');
	}

	// delete the last item added to the array
	onClickLess(){
		console.log("onClickLess()");
		this.arrayData.pop();
	}

	// Check if inputData it's filled, if true, add item to arrayData
	onClickMore(){
		console.log("onClickMore()");
		if(this.myData == ""){
			this.errorInfo = "Write a name";
		}else{
			this.arrayData.push(this.myData);
			this.myData = "";
		}
	}

	// Delete posible errorInfo message
	onFocusInput(){
		console.log("onFocusInput()");
		this.errorInfo = "";
	}

	// onClick finnish button, if we are in homemate assign arrayData to houseMates and change mode to task
	// if mode is task, assign arrayData to houseMates and adjust the data
	finnish(){
		console.log("finnis()");
		if(this.mode == "homemate"){
			this.taskDistribution.houseMates = this.arrayData.slice();
			this.mode = "task";
			this.arrayData = [];
		}else if(this.mode == "task"){
			this.taskDistribution.tasks = this.arrayData.slice();
			this.adjustData();
		}
		console.log(this.taskDistribution);
		
	}

	// Complete arrays in case task.length != houseMate.length 
	adjustData(){
		console.log("adjustData");
		if(this.taskDistribution.houseMates.length > this.taskDistribution.tasks.length){
			console.log("adjustData_MoreHouseMates");
			while(this.taskDistribution.houseMates.length > this.taskDistribution.tasks.length){
				this.taskDistribution.tasks.push("Rest");
			}
		}
		console.log(this.taskDistribution);
		this.navCtrl.push(HomePage, {taskDistribution: this.taskDistribution});
	}

}
