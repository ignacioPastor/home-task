import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReportBugPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
	selector: 'page-report-bug',
	templateUrl: 'report-bug.html',
})
export class ReportBugPage {

	contentBug: string = 'testing content of the bug';

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ReportBugPage');
	}

	onClickSend() {
		console.log("onClickSend()");
		
	}

	onClickCancel() {
		console.log("onClickCancel()");
		this.navCtrl.pop();
	}
}
