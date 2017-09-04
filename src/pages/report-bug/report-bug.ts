import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilsProvider } from './../../providers/utils/utils';
import { NotificationProvider } from './../../providers/notification/notification';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
	selector: 'page-report-bug',
	templateUrl: 'report-bug.html',
})
export class ReportBugPage {

	contentBug: string = '';

	constructor(public navCtrl: NavController, public navParams: NavParams, private utilsProvider: UtilsProvider,
		private storage: Storage, private notificator: NotificationProvider) {

	}

	async onClickSend() {

		if (!this.contentBug || this.contentBug.length == 0) {
			this.notificator.showError("Please write a description of the bug");
		} else {

			let result;
			try {
				result = await this.utilsProvider.reportBug(this.contentBug, (await this.storage.get("user")).email);
			} catch (err) {
				result = { ok: false };
			}
	
			if (result.ok) this.notificator.showMessage("Message sent. Thank you for your report!", "Info");
			else this.notificator.showError("Error sending your report.")
		}
	}

	onClickCancel() {
		console.log("onClickCancel()");
		this.navCtrl.pop();
	}
}
