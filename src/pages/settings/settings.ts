import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditUserPage } from './../edit-user/edit-user';
import { Constants } from './../../constants';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
	selector: 'page-settings',
	templateUrl: 'settings.html',
})
export class SettingsPage {

	constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
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
		this.navCtrl.push(EditUserPage, { mode: Constants.MODE_EDIT.CHANGE_MAIL });
	}

	async showUserInternalStorage() {
		let user = await this.storage.get('user');
		console.log("User in internal storage");
		console.log(user);
	}

}
