

export class TaskDistribution{

    houseMates: string[];
    tasks: string[];

    constructor(json: any){
        if(typeof json == "string"){
            json = JSON.parse(json);
        }
        this.houseMates = json.houseMates;
        this.tasks = json.tasks;
    }

}