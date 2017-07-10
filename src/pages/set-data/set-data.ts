import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Nav, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { TaskDistribution } from "./../../models/TaskDistribution";
import { HomePage } from "./../home/home";

import { Keyboard } from '@ionic-native/keyboard';

@IonicPage()
@Component({
	selector: 'set-data',
	templateUrl: 'set-data.html',
})
export class SetData {

	@ViewChild('focusInput') myInput ;

	taskDistribution: TaskDistribution;
	arrayData: string[] = []; // take the data entered by the user
	mode: string = "homemate";
	myData: string = "";
	errorInfo: string = "";

	constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private keyboard: Keyboard) {
		this.taskDistribution = new TaskDistribution(null);
	}

	ionViewDidEnter() {
	}

	// put the focus in the input field
	putFocus(){
		//https://stackoverflow.com/questions/39612653/set-focus-on-an-input-with-ionic-2
			this.myInput.setFocus();
			this.keyboard.show(); // for android
	}

	// delete the last item added to the array
	onClickLess(){
		this.arrayData.pop();
	}

	// Check if inputData it's filled, if true, add item to arrayData
	onClickMore(){
		if(this.myData == ""){
			this.errorInfo = "Write a name";
		}else{
			this.arrayData.push(this.myData);
			this.myData = "";
		}
		this.putFocus();
	}

	// Delete posible errorInfo message
	onFocusInput(){
		this.errorInfo = "";
	}

	// onClick finnish button, if we are in homemate assign arrayData to houseMates and change mode to task
	// if mode is task, assign arrayData to houseMates and adjust the data
	finnish(){
		if(this.myData != ""){
			this.arrayData.push(this.myData);
			this.myData = "";
		}
		
		if(this.mode == "homemate" && this.arrayData.length > 0){
			this.taskDistribution.houseMates = this.arrayData.slice();
			this.mode = "task";
			this.arrayData = [];
			this.myData = "";
		}else if(this.mode == "task" && this.arrayData.length > 0){
			this.taskDistribution.tasks = this.arrayData.slice();
			this.adjustData();
			this.randomizeAssignations();
			this.navCtrl.push(HomePage, {taskDistribution: this.taskDistribution});
			
			this.storage.set('taskDistribution', this.taskDistribution);
		}
	}

	// if there are more houseMates than task, complete with "Rest" tasks distribuites along of the array
	adjustData(){
		let dif = this.taskDistribution.houseMates.length - this.taskDistribution.tasks.length;
        let first: Boolean = false;
		if(dif > 0){
			let pos = Math.trunc(this.taskDistribution.tasks.length / (dif==1?dif+1:dif));
			while(this.taskDistribution.houseMates.length > this.taskDistribution.tasks.length){
				this.taskDistribution.tasks.splice(pos<this.taskDistribution.tasks.length?pos:this.taskDistribution.tasks.length, 0, "Rest");
			
                pos += pos;
                if(!first){
                    first = true;
                    pos++;
                }
			}
		}
	}

	// reorders in random way the assignations of tasks
	randomizeAssignations(){
		let n: number = Math.floor((Math.random() * 20) + 1);
		for(let i=0; i<n; i++){
			this.taskDistribution.houseMates.unshift(this.taskDistribution.houseMates.pop());
        }
	}
}
