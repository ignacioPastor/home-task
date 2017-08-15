import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SetData } from './../set-data/set-data';
import { SetDataAssigned } from './../set-data-assigned/set-data-assigned';

@IonicPage()
@Component({
	selector: 'toggle-type-set-data',
	templateUrl: 'toggle-type-set-data.html',
})
export class ToggleTypeSetData {

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
	}

	clickRandomAssignation(){
		console.log("clickRandomAssignation");
		this.navCtrl.push(SetData);
	}

	clickAssignedDistribution(){
		console.log("clickAssignedDistribution");
		this.navCtrl.push(SetDataAssigned);
	}
}
