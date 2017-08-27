import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Constants } from '../../constants';


@Injectable()
export class AuthProvider {

	constructor(public http: Http) {

	}

	async signIn(email, password) {
		let headers = new Headers();
		headers.append("Content-Type", 'application/json');

		let options: any = { headers };
		
		return this.http.post(`${Constants.SERVER_IP}/auth/signin`, { email, password }, 
			new RequestOptions(options)).map(response => {
			 	return response.json();
			}).toPromise();
	
	}

}
