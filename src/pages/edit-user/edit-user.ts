import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Constants } from './../../constants';
import { Utils } from './../../utils';
import { IResult } from './../../interfaces/IResult';
import { UserProvider } from './../../providers/user/user';
import { NotificationProvider } from './../../providers/notification/notification';


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


	constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider,
		private notificator: NotificationProvider) {
		this.mode = this.navParams.get('mode');
	}

	ionViewDidLoad() {
		this.configureMode(this.mode);
	}

	configureMode(myMode: string) {
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
		}
	}

	clickButton() {
		if (this.mode == Constants.MODE_EDIT.FORGOT_PASSWORD) {
			this.forgotPasswordEmailEntered();

		} else if (this.mode == Constants.MODE_EDIT.FP_ASK_CODE) {
			this.checkCode(Constants.MODE_EDIT.FP_ASK_CODE);

		} else if (this.mode == Constants.MODE_EDIT.CHANGE_PASSWORD) {
			this.changePassword();

		}
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

		if (!resultUpdate || !result.ok) {
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

}
