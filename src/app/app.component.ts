import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { TaskDistribution } from "./../models/TaskDistribution";

import { HomePage } from '../pages/home/home';
@Component({
	templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

 	// rootPage:any = HomePage;
 	rootPage:any;

	storedData: TaskDistribution;

	constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage,
			private alertCtrl: AlertController) {
		platform.ready().then(() => {
			statusBar.styleDefault();

			this.storage.ready().then(() => {
				this.storage.get('storedData').then(data => {
					splashScreen.hide();
					if(data){
						//this.storedData = data;	// in the future charge data from stored data (think how parse from string)
						this.storeData();
					}else{
						this.storeData();
					}
					this.nav.setRoot(HomePage, {storedData: this.storedData});
				})
			})
		});
	}

	private storeData(){
		console.log("storeDataFunction-----------------1");
        // this.storedData = new Map<string, string[]>();
		let myTasks: string[] = ["Kitchen", "Downstairs bathroom", "Rest", "Living room", "Upstairs bathroom"];
		let myHouseMates: string[] = ["Ignacio", "Carol", "Mari Carmen", "Javi", "Tomasz"];
		this.storedData = new TaskDistribution({tasks: myTasks, houseMates: myHouseMates});
		console.log("storeDataFunction-----------------2");
		console.log(this.storedData);
		// this.storedData.set("task", task);
		// this.storedData.set("houseMates", houseMates);
		//this.storage.setItem("storedData", this.storedData.toString());
	}

	public showErrorPopup(message: string) {
        this.alertCtrl.create({
            title: 'Error',
            subTitle: message,
            buttons: ['OK']
        }).present();
    }
}

