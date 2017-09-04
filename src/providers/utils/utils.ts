import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import { Constants } from '../../constants';


@Injectable()
export class UtilsProvider {

	constructor(public http: Http) {
		console.log('Hello UtilsProvider Provider');
	}

	async sendCode(email: string, checkEmailExistInDatabase: boolean) {
		let headers = new Headers();
		headers.append("Content-Type", 'application/json');

		let options: any = { headers };

		return this.http.post(`${Constants.SERVER_IP}/setting-utils/sendcode`, { userEmail: email, checkEmailExistInDatabase }, new RequestOptions(options)).map(response => response.json()).toPromise();
	}
  
	async checkCode(myCode: string, myIdentifyKey: string) {
		let headers = new Headers();
		headers.append("Content-Type", 'application/json');

		let options: any = { headers };
		let data: any = { code: myCode,identifyKey: myIdentifyKey };

		return this.http.post(`${Constants.SERVER_IP}/setting-utils/checkcode`, data, new RequestOptions(options)).map(response => response.json()).toPromise();
	}

	async reportBug(bugContent: string, email: string) {
		let headers = new Headers();
		headers.append("Content-Type", 'application/json');

		let options: any = { headers };
		let data: any = { bugContent, email };

		return this.http.post(`${Constants.SERVER_IP}/setting-utils/reportbug`, data, new RequestOptions(options)).map(response => response.json()).toPromise();
	}
}
