

export class User{

    id?: number;
    userName: string;
    email: string;
    password?: string;

    constructor(json?: any){
        this.id = json && json.id ? json.id : null;
        this.userName = json ? json.userName : null;
        this.email = json ? json.email : null;
        this.password = json ? json.password : null;
    }

}