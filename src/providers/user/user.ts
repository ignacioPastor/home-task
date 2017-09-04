import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Constants } from '../../constants';
import 'rxjs/add/operator/map';
import { User } from './../../models/User';


@Injectable()
export class UserProvider {

	constructor(public http: Http) {

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

	async updateUser(user: User, newEmail: string) {
		let headers = new Headers();
		headers.append("Content-Type", 'application/json');

		let options: any = { headers };
		let data: any = { user, newEmail };

		return this.http.post(`${Constants.SERVER_IP}/user/updateuser`, data, new RequestOptions(options)).map(response => response.json()).toPromise();
	}

}
