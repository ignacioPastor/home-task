import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'set-data-assigned',
  templateUrl: 'set-data-assigned.html',
})
export class SetDataAssigned {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetDataAssignedPage');
  }

}
