import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { TaskDistribution } from "./../models/TaskDistribution";

import { HomePage } from '../pages/home/home';
import { SetData } from '../pages/set-data/set-data'
@Component({
	templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

 	// rootPage:any = HomePage;
 	rootPage:any;

	taskDistribution: TaskDistribution;

	constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage,
			private alertCtrl: AlertController) {
		console.log("app.component_constructor---------1");
		platform.ready().then(() => {
			statusBar.styleDefault();

			this.storage.ready().then(() => {
				this.storage.get('taskDistribution').then(data => {
					splashScreen.hide();
					if(data){
		console.log("app.component_constructor---------2");
						this.taskDistribution = data;	// in the future charge data from stored data (think how parse from string)
						this.nav.setRoot(HomePage, {taskDistribution: this.taskDistribution});
					}else{
		console.log("app.component_constructor---------3");
						// this.nav.setRoot(SetData);
						this.nav.setRoot(HomePage);
						//this.storeData();
					}
					
				})
			})
		});
	}

	private storeData(){
		console.log("storeDataFunction-----------------1");
		let myTasks: string[] = ["Kitchen", "Downstairs bathroom", "Rest", "Living room", "Upstairs bathroom"];
		let myHouseMates: string[] = ["Ignacio", "Carol", "Mari Carmen", "Javi", "Yahir"];
		this.taskDistribution = new TaskDistribution({tasks: myTasks, houseMates: myHouseMates});
		console.log("storeDataFunction-----------------2");
		console.log(this.taskDistribution);
	}

	public showErrorPopup(message: string) {
        this.alertCtrl.create({
            title: 'Error',
            subTitle: message,
            buttons: ['OK']
        }).present();
    }
}

