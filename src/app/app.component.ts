import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { TaskDistribution } from "./../models/TaskDistribution";

import { HomePage } from '../pages/home/home';
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

	taskDistribution: TaskDistribution;

	constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage,
			private alertCtrl: AlertController) {
		platform.ready().then(() => {
			statusBar.styleDefault();

			this.storage.ready().then(() => {
				this.storage.get('taskDistribution').then(data => {
					splashScreen.hide();
					if(data){
						this.taskDistribution = data;	// in the future charge data from stored data (think how parse from string)
						this.nav.setRoot(HomePage, {taskDistribution: this.taskDistribution});
					}else{
						this.nav.setRoot(ToggleTypeSetData);
					}
					
				})
			})
		});

		this.menuItems = [
			{title: "New Distribution", icon: "fa fa-trash-o", pos: 1}
		]
	}
	onClickMenuItem(item: any){
		console.log("onClickMenuItem()");
		if(item.pos == 1) this.newDistribution();
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

	async updateSunday(){
		console.log("updateSunday()");
		this.taskDistribution.sunday = this.sunday;
		await this.storage.remove('taskDistribution');
		this.storage.set('taskDistribution', this.taskDistribution);

	}


}

