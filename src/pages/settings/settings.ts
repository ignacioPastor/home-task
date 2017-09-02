import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditUserPage } from './../edit-user/edit-user';
import { Constants } from './../../constants';


@IonicPage()
@Component({
	selector: 'page-settings',
	templateUrl: 'settings.html',
})
export class SettingsPage {

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SettingsPage');
	}

	onClickReportBug() {
		console.log("onClickReportBug()");
	}

	onClickChangePassword() {
		console.log("onClickChangePassword()");
		this.navCtrl.push(EditUserPage, { mode: Constants.MODE_EDIT.CHANGE_PASSWORD_CONFIRM_PASS });
	}

	onClickRemoveAccount() {
		console.log("onClickRemoveAccount()");
		this.navCtrl.push(EditUserPage, { mode: Constants.MODE_EDIT.REMOVE_ACCOUNT });
	}

	onClickChangeEmail() {
		console.log("onClickChangeEmail()");
	}

}
