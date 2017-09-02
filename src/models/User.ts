

export class User{

    id?: number;
    userName: string;
    email: string;
    password?: string;

    constructor(json?: any){
        this.id = json && json.id ? json.id : null;
        this.userName = json && json.userName ? json.userName : '';
        this.email = json && json.email ? json.email : '';
        this.password = json && json.password ? json.password : '';
    }

}