import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Constants } from '../../constants';
import 'rxjs/add/operator/map';
import { User } from './../../models/User';


@Injectable()
export class UserProvider {

	constructor(public http: Http) {

	}

	async checkCode(myCode: string, myIdentifyKey: string) {
		let headers = new Headers();
		headers.append("Content-Type", 'application/json');

		let options: any = { headers };
		let data: any = { code: myCode,identifyKey: myIdentifyKey };

		return this.http.post(`${Constants.SERVER_IP}/setting-utils/checkcode`, data, new RequestOptions(options)).map(response => response.json()).toPromise();
	}

	async removeUser(userID) {
		let headers = new Headers();
		headers.append("Content-Type", 'application/json');

		let options: any = { headers };

		return this.http.post(`${Constants.SERVER_IP}/user/remove`, { userId: userID }, new RequestOptions(options)).map(response => response.json()).toPromise();
	}

	async createUser(user: User) {
		let headers = new Headers();
		headers.append("Content-Type", 'application/json');

		let options: any = { headers };

		return this.http.post(`${Constants.SERVER_IP}/user/create`, { user }, new RequestOptions(options)).map(response => response.json()).toPromise();
	}

	async updatePassword(myEmail: string, myPass: string) {
		let headers = new Headers();
		headers.append("Content-Type", 'application/json');

		let options: any = { headers };
		let data: any = { email: myEmail, password: myPass };

		return this.http.post(`${Constants.SERVER_IP}/user/updatepassword`, data, new RequestOptions(options)).map(response => response.json()).toPromise();
	}

	async sendCode(email: string) {
		let headers = new Headers();
		headers.append("Content-Type", 'application/json');

		let options: any = { headers };

		return this.http.post(`${Constants.SERVER_IP}/setting-utils/sendcode`, { userEmail: email }, new RequestOptions(options)).map(response => response.json()).toPromise();
	}

}
