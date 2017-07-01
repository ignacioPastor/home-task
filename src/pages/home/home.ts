import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    storedData: Map<string, string[]>;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        console.log("home----------------------1");
        this.storedData = this.navParams.get("storedData");
        console.log("home----------------------2");
        console.log(this.storedData);   
    }

}
