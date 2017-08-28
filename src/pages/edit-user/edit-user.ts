import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Constants } from './../../constants';
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
	mode: string;
	infoText: string;
	showField_2: boolean;


	constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider,
			private notificator: NotificationProvider) {
		this.mode = this.navParams.get('mode');
	}

	ionViewDidLoad() {
		this.fillTexts();
	}

	fillTexts(){
		if(this.mode == Constants.MODE_EDIT.FORGOT_PASSWORD){
			this.infoText = "";
			this.placeholder_1 = 'Enter your email';
			this.showField_2 = false;
		}
	}

	clickButton(){
		console.log("clickButton()");

		if(this.mode == Constants.MODE_EDIT.FORGOT_PASSWORD){
			// In the server: 
			// 		Check if the email exists
			// 		Send code to the email
			this.forgotPasswordEmailEntered();
		}
	}

	forgotPasswordEmailEntered(){
		if(!this.field_1 || !(this.field_1.length > 0)){
			this.notificator.showMessage('Please fill the email field', 'Error');
		}
		//let result: IResult = this.userProvider.sendCode(this.field_1);
	}

}
