import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { NotificationProvider } from './../../providers/notification/notification';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { ToggleTypeSetData } from '../toggle-type-set-data/toggle-type-set-data';

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
		console.log('ionViewDidLoad LoginPage');
	}

	forgotPassword(){
		console.log("forgotPassword()");
	}

	signUp(){
		console.log("signUp()");
	}

	async signIn(){
		console.log("signIn-------------------1");
		
		try {
			console.log("signIn-------------------2");
			let result = await this.auth.signIn(this.email, this.password);
			console.log("signIn-------------------3");
			if(result && result.ok){
				console.log("signIn-------------------4");
				this.storage.set('user', result.user);
				this.navCtrl.push(ToggleTypeSetData);
			}else{
				console.log("signIn-------------------5");
				this.notificator.showError("Password or email incorrect!");
			}
		} catch (err){
			console.log("signIn-------------------6");
			console.error(err);
			this.notificator.showUnexpectedError();
		}
		
		

	}

}
