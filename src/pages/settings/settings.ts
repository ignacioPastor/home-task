import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditUserPage } from './../edit-user/edit-user';
import { ReportBugPage } from './../report-bug/report-bug';
import { Constants } from './../../constants';


@IonicPage()
@Component({
	selector: 'page-settings',
	templateUrl: 'settings.html',
})
export class SettingsPage {

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	onClickReportBug() {
		this.navCtrl.push(ReportBugPage);
	}

	onClickChangePassword() {
		this.navCtrl.push(EditUserPage, { mode: Constants.MODE_EDIT.CHANGE_PASSWORD_CONFIRM_PASS });
	}

	onClickRemoveAccount() {
		this.navCtrl.push(EditUserPage, { mode: Constants.MODE_EDIT.REMOVE_ACCOUNT });
	}

	onClickChangeEmail() {
		this.navCtrl.push(EditUserPage, { mode: Constants.MODE_EDIT.CHANGE_MAIL });
	}

}
