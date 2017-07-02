

export class TaskDistribution{

    houseMates: string[];
    tasks: string[];
    adjustedHouseMates: string[];

    constructor(json: any){
        if(json == null){
            this.houseMates = [];
            this.tasks = [];
            this.adjustedHouseMates = [];
        }else{
            if(typeof json == "string"){
                json = JSON.parse(json);
            }
            this.houseMates = json.houseMates;
            this.tasks = json.tasks;
            this.setAdjustedHouseMates();
        }
    }

    public setAdjustedHouseMates(){
        console.log("setAdjustedHouseMates()");
        console.log(this.houseMates);
        this.adjustedHouseMates = [];
        let i;
        let k;
        for(i=0, k=0; i<this.tasks.length; i++){
            console.log("for; i = " + i + ", k = " + k);
            console.log(this.adjustedHouseMates);
            // this.adjustedHouseMates[k] = this.houseMates[k];
            // k = k < this.houseMates.length ? ++k : 0;
            if(k < this.houseMates.length){
                console.log("for_if");
                this.adjustedHouseMates[i] = this.houseMates[k];
            }else{
                console.log("for_else");
                k = 0;
                this.adjustedHouseMates[i] = this.houseMates[k];
            }
            k++;
            console.log("");
        }
    }

}