import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Constants } from './../../constants';
import { Utils } from './../../utils';
import { IResult } from './../../interfaces/IResult';
import { UserProvider } from './../../providers/user/user';
import { AuthProvider } from './../../providers/auth/auth';
import { NotificationProvider } from './../../providers/notification/notification';
import { User } from './../../models/User';
import { LoginPage } from '../login/login';

import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
	selector: 'page-edit-user',
	templateUrl: 'edit-user.html',
})
export class EditUserPage {

	field_1: string;
	field_2: string;
	placeholder_1: string;
	placeholder_2: string;
	typeField_1: string;
	typeField_2: string;
	mode: string;
	infoText: string;
	showField_2: boolean;
	identifyKey: string;
	emailUser: string;

	user: User;


	constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider,
		private notificator: NotificationProvider, private auth: AuthProvider, private storage: Storage) {
		this.mode = this.navParams.get('mode');
	}

	async ionViewDidLoad() {
		this.user = new User(await this.storage.get('user'));
		this.configureMode(this.mode);
	}


	async configureMode(myMode: string) {
		this.mode = myMode;
		this.field_1 = '';
		this.field_2 = '';

		if (myMode == Constants.MODE_EDIT.FORGOT_PASSWORD) {
			this.infoText = "";
			this.placeholder_1 = 'Enter your email';
			this.typeField_1 = 'text';
			this.showField_2 = false;
		} else if (myMode == Constants.MODE_EDIT.FP_ASK_CODE) {
			this.infoText = "Check your email to get your authentication code";
			this.placeholder_1 = 'Enter your code';
			this.typeField_1 = 'text';
			this.showField_2 = false;
		} else if (myMode == Constants.MODE_EDIT.CHANGE_PASSWORD) {
			this.infoText = "Please enter your new password";
			this.placeholder_1 = "New Password";
			this.placeholder_2 = "Confirm Password";
			this.showField_2 = true;
			this.typeField_1 = 'password';
			this.typeField_2 = 'password';
		} else if (myMode == Constants.MODE_EDIT.CHANGE_PASSWORD_CONFIRM_PASS) {
			this.infoText = "Please enter your current password";
			this.placeholder_1 = "Current password";
			this.showField_2 = false;
			this.typeField_1 = 'password';
			// this.emailUser = (await this.storage.get('user')).email;
			this.emailUser = this.user.email;
		} else if (myMode == Constants.MODE_EDIT.REMOVE_ACCOUNT) {
			this.infoText = "Remove Account. Please enter your password to authenticate.";
			this.placeholder_1 = "Password";
			this.showField_2 = false;
			this.typeField_1 = 'password';
			// this.emailUser = (await this.storage.get('user')).email;
			this.emailUser = this.user.email;
		}
	}

	clickButton() {
		if (this.mode == Constants.MODE_EDIT.FORGOT_PASSWORD) {
			this.forgotPasswordEmailEntered();

		} else if (this.mode == Constants.MODE_EDIT.FP_ASK_CODE) {
			this.checkCode(Constants.MODE_EDIT.FP_ASK_CODE);

		} else if (this.mode == Constants.MODE_EDIT.CHANGE_PASSWORD) {
			this.changePassword();
		} else if (this.mode == Constants.MODE_EDIT.CHANGE_PASSWORD_CONFIRM_PASS) {
			this.checkCorrectPassword();
		} else if(this.mode == Constants.MODE_EDIT.REMOVE_ACCOUNT) {
			this.checkCorrectPassword();
		}
	}

	async checkCorrectPassword() {
		if (!this.field_1 || !(this.field_1.length > 0)) {
			this.notificator.showMessage('Please fill the password field', 'Error');
		} else {
			let result: IResult;
			try {
				result = await this.auth.signIn(this.emailUser, this.field_1);
			}catch(err) {
				console.error(err);
				result = {ok: false, error: "Unexpected error" };
			}
			if(!result || !result.ok) {
				this.notificator.showMessage("Incorrect password", "Error:");
			} else {
				if(this.mode == Constants.MODE_EDIT.CHANGE_PASSWORD_CONFIRM_PASS) {
					this.configureMode(Constants.MODE_EDIT.CHANGE_PASSWORD);
				} else if (this.mode == Constants.MODE_EDIT.REMOVE_ACCOUNT) {
					this.confirmRemoveAccount();
				}
			}
		}

	}

	confirmRemoveAccount(){
		let myYesHandler = async () => {
			try {
				await this.userProvider.removeUser(this.user.id);
				this.signOut();
			} catch (err) {
				this.notificator.showUnexpectedError();
			}
		};
		let myNoHandler = () => {
			console.log("Choosen no");
		};

		this.notificator.showConfirm('Are you sure about delete your account?', myYesHandler, myNoHandler);
	}

	async changePassword() {
		let result: IResult = Utils.validatePassword(this.field_1, this.field_2);

		if (!result || !result.ok) {
			this.notificator.showMessage(result.error, "Invalid password");
			return;
		}

		let resultUpdate: IResult;
		try{
			resultUpdate = await this.userProvider.updatePassword(this.emailUser, this.field_1);
		}catch(err){
			console.log(err);
			resultUpdate = { ok: false, error: 'Unexpected error.'};
		}

		if (!resultUpdate || !resultUpdate.ok) {
			this.notificator.showUnexpectedError(resultUpdate.error);
		} else {
			this.notificator.showMessage("Password updated correctly", "Password updated");
			this.navCtrl.pop();
		}
	}

	async checkCode(originMode) {
		let result: IResult;
		try {
			result = await this.userProvider.checkCode(this.field_1, this.identifyKey);
		} catch (err) {
			console.log(err);
			result = { ok: false, error: 'Unexpected error.' };
		}

		if (!result || !result.ok) {
			this.notificator.showError(result.error);
		} else {



			this.configureMode(Constants.MODE_EDIT.CHANGE_PASSWORD);
		}
	}

	async forgotPasswordEmailEntered() {
		if (!this.field_1 || !(this.field_1.length > 0)) {
			this.notificator.showMessage('Please fill the email field', 'Error');
		} else {
			// We store the email to identify after the user
			this.emailUser = this.field_1;
			let result: IResult;
			try {
				result = await this.userProvider.sendCode(this.field_1);

			} catch (err) {
				console.log(err);
				result = { ok: false, error: 'Error ocurred.'};
			}

			if (!result || !result.ok) {
				this.notificator.showError(result.error);
			} else {
				this.identifyKey = result.identifyKey;

				this.configureMode(Constants.MODE_EDIT.FP_ASK_CODE);
			}
		}

	}

	async signOut() {
		await this.storage.remove('user');
		await this.storage.remove('user');
		this.navCtrl.setRoot(LoginPage);
	}

}
