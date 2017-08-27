import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { NotificationProvider } from './../../providers/notification/notification';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { ToggleTypeSetData } from '../toggle-type-set-data/toggle-type-set-data';
import { SignupPage } from '../signup/signup';


@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	email: string;
	password: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, private storage: Storage, private notificator: NotificationProvider) {
	}

	ionViewDidLoad() {

	}

	forgotPassword() {
		console.log("forgotPassword()");
	}

	signUp() {
		this.navCtrl.push(SignupPage);
	}

	async signIn() {

		try {
			let result = await this.auth.signIn(this.email, this.password);
			if (result && result.ok) {
				this.storage.set('user', result.user);
				this.navCtrl.push(ToggleTypeSetData);
			} else {
				this.notificator.showError("Password or email incorrect!");
			}
		} catch (err) {
			console.error(err);
			this.notificator.showUnexpectedError();
		}
	}

}
