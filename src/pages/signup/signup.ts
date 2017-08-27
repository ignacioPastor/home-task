import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from './../../models/User'
import { NotificationProvider } from './../../providers/notification/notification';
import { UserProvider } from './../../providers/user/user';
import { IResult } from './../../interfaces/IResult'
import { ToggleTypeSetData } from '../toggle-type-set-data/toggle-type-set-data';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
	selector: 'page-signup',
	templateUrl: 'signup.html',
})
export class SignupPage {

	user: User;
	passwordControl: string = '';

	constructor(public navCtrl: NavController, public navParams: NavParams, private notificator: NotificationProvider, 
			private userProvider: UserProvider, private storage: Storage) {
		this.user = new User();
	}

	ionViewDidLoad() {
		
	}

	async signUp(){

		if (this.validateFields()) {
			let result: IResult;
			try{
				result = await this.userProvider.createUser(this.user);
			} catch (err) {
				result = { ok: false, error: err };
			}

			if (result.ok) {
				this.navCtrl.push(ToggleTypeSetData);
				this.storage.set('user', result.user);
			} else {
				this.notificator.showError(result.error);
			}

		}
	}

	validateFields(){

		if (!(this.user.userName.length > 0)) {
			this.notificator.showMessage("Please fill the name field.", "Invalid User Name");
			return false;
		}

		if (!this.validateEmail(this.user.email)) {
			this.notificator.showMessage("Please, insert a valid email.", "Invalid email");
			return false;
		}
		
		if (!this.validatePassword(this.user.password, this.passwordControl)){
			return false;
		}

		return true;

	}

	validateEmail(email){
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	validatePassword(pass, pass2): boolean{

		if(pass != pass2){
			this.notificator.showMessage("Both fields must match", "Incorrect password");
			return false;
		}

		if(pass == ''){
			this.notificator.showMessage("Password can't be empty", "Incorrect password");
			return false;
		}

		if(pass.length < 6){
			this.notificator.showMessage("Password must have at least 6 characters", "Incorrect password");
			return false;
		}

		return true;
	}

	async removeAccount(){
		let result: IResult;

		try{
			result = await this.userProvider.removeUser(this.user.email);

		} catch (err) {
			result = { ok: false, error: err };
		}

		if (result.ok) {
			this.notificator.showMessage("User removed succesfully.", "Removing User");
		} else {
			this.notificator.showError(result.error);
		}
	}

}
