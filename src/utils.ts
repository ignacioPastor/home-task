import { IResult } from './interfaces/IResult';

export class Utils {

    public static validatePassword(pass1: string, pass2: string): IResult {
            
        if (pass1 != pass2) {
            return { ok: false, error: "Both fields must match" };
        }

        if (pass1 == '') {
            return { ok: false, error: "Password can't be empty" };
        }

        if (pass1.length < 6) {
            return { ok: false, error: "Password must have at least 6 characters" };
        }

        return { ok: true };
    }

    public static validateEmail(email){
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}


}