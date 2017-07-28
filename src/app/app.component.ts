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
    menuItems: Array<{ title, icon}>;

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
			{title: "Change Distribution", icon: "fa fa-pencil-square-o"},
			{title: "New Distribution", icon: "fa fa-trash-o"}
		]
	}
	onClickMenuItem(item: any){
		console.log("onClickMenuItem()");
		if(item.title == "Change Distribution") this.changeDistribution();
		if(item.title == "New Distribution") this.newDistribution();
	}
	newDistribution(){
		console.log("onClickNewDistribution()");
	}

	changeDistribution(){
		console.log("onClickChangeDistribution()");
	}
}

