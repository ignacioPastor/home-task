import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Constants } from '../../constants';


@Injectable()
export class AuthProvider {

	constructor(public http: Http) {
		console.log('Hello AuthProvider Provider');
	}

	async signIn(email, password) {
		console.log("authProvider_signIn--------------------------1");
		let headers = new Headers();
		headers.append("Content-Type", 'application/json');

		let options: any = { headers };
		console.log("authProvider_signIn--------------------------2");
		
		return this.http.post(`${Constants.SERVER_IP}/auth/signin`, { email, password }, 
			new RequestOptions(options)).map(response => {

				console.log("authProvider_signIn--------------------------3");
			 	return response.json();
			}).toPromise();
	
	}

}
