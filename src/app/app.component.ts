import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AlertController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { TaskDistribution } from "./../models/TaskDistribution";

import { NotificationProvider } from './../providers/notification/notification';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SetData } from '../pages/set-data/set-data';
import { SetDataAssigned } from '../pages/set-data-assigned/set-data-assigned';
import { ToggleTypeSetData } from '../pages/toggle-type-set-data/toggle-type-set-data';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

 	rootPage: any;
	menuItems: Array<{ title, icon, pos}>;
	sunday: boolean;
	toggleDisabled: boolean = false;


	taskDistribution: TaskDistribution;

	constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private storage: Storage,
			private alertCtrl: AlertController, public events: Events, private notificationProvider: NotificationProvider) {
		
		// this.splashScreen.show(); not sure if it's necessary
		
		this.initApp();

		this.menuItems = [
			{title: "New Distribution", icon: "fa fa-trash-o", pos: 1},
			{title: "Sign Out", icon: "fa fa-trash-o", pos: 2}
		]
	}



	async initApp(){
		await this.platform.ready();
		this.statusBar.styleDefault();
		await this.storage.ready();
		let user = await this.storage.get('user');
		setTimeout(() => this.splashScreen.hide(), 250);
		if (user) {
            this.nav.setRoot(HomePage);
        }
        else {
            this.nav.push(LoginPage, { animate: false, splash: this.splashScreen });
        }
	}






	onClickMenuItem(item: any){
		console.log("onClickMenuItem()");
		if(item.pos == 1) this.newDistribution();
		if(item.pos == 2) this.signOut();
	}

	async signOut() {
        await this.storage.remove('user');
        await this.storage.remove('user');
		await this.storage.remove('user');
		this.nav.setRoot(LoginPage);
    }

	async newDistribution(){
		console.log("onClickNewDistribution()");
		for(let i=0; i<10; i++)
		await this.storage.remove('taskDistribution');
		this.nav.setRoot(ToggleTypeSetData);
	}

	async testFunction(){
		console.log("testFunction()");
		let dataStored = await this.storage.get("taskDistribution");
		console.log("storage");
		console.log(dataStored);
	}

	disallowNext: boolean = false;
	async updateSunday(){
		console.log("updateSunday()---------1");

		// to avoid logic of this function, useful on change this.sunday value by code, which throws the onChange event too
		if(this.disallowNext){
			this.disallowNext = false;
			return;
		}

		// Only allow one toggle each second to avoid multitapping, which throws multiple events
		//     and finally gives an error due to remove and set storage asynchronously
		this.toggleDisabled = true;
		setTimeout(() => {
			this.toggleDisabled = false;
		}, 1000);

		// If in this season we have just created the task distribution we have not stored yet any taskDistribution
		if(!this.taskDistribution) this.taskDistribution = await this.storage.get("taskDistribution");

		// Still any taskDistribution has been asigned
		if(!this.taskDistribution){
			this.notificationProvider.showMessage("Please, fill before some task distribution.", "Info:");
			this.disallowNext = true;
			this.sunday = false;
			return;
		}
		this.taskDistribution.sunday = this.sunday;

		// stored taskDistribution has the week 1 of year distribution, and this.task... has
		//     the current distribution maybe, so we only should update the sunday attribute on toggleSunday
		let newTask = await this.storage.get("taskDistribution");
		for(let i=0; i<10; i++) await this.storage.remove('taskDistribution');
		newTask.sunday = this.sunday;
		await this.storage.set('taskDistribution', this.taskDistribution);
		
		this.events.publish('taskDistributionChanged');
	}

	async manageStoredDistribution(){
		let data = await this.storage.get('taskDistribution');
		if(data){
			this.taskDistribution = data;	// in the future charge data from stored data (think how parse from string)
			this.sunday = this.taskDistribution.sunday;
			this.nav.setRoot(HomePage, {taskDistribution: this.taskDistribution});
		}else{
			this.nav.setRoot(ToggleTypeSetData);
		}
	}


}

