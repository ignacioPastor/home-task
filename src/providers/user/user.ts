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

}