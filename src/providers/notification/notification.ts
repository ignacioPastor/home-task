import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';


@Injectable()
export class NotificationProvider {

	constructor(public http: Http, private alertCtrl: AlertController) {
		
	}

	showError(message) {
		this.alertCtrl.create({
			title: 'Error',
			subTitle: message,
			buttons: ['OK']
		}).present();

		console.error('Error: ' + message);
	}

	showMessage(message: string, myTitle: string) {
		this.alertCtrl.create({
			title: myTitle,
			subTitle: message,
			buttons: ['OK']
		}).present();
	}

	showUnexpectedError(error?) {
		this.alertCtrl.create({
			title: 'Error',
			subTitle: 'An unexpected error has occured!',
			buttons: ['OK']
		}).present();

		console.error('Unexpected error: ' + error);
		console.dir(error);
	}

}
