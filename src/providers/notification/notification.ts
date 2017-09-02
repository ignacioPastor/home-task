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

		/**
	 * Show box asking confirmation
	 * @param myYesHandler function received and used in case the user select yes option
	 * @param myNoHandler function received and used in case the user select no option
	 */
	showConfirm(myMessage, myYesHandler, myNoHandler) {
		let confirm = this.alertCtrl.create({
			title: 'Caution!',
			message: myMessage,
			buttons: [
				{
					text: 'Disagree',
					handler: myNoHandler
				},
				{
					text: 'Agree',
					handler: myYesHandler
				}
			]
		});

		// Show the box asking confirmation
		confirm.present();
	}	// end Confirm

}
