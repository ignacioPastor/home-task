export class TaskDistribution{

    houseMates: string[];
    tasks: string[];
    adjustedHouseMates: string[];
    sunday: boolean;

    constructor(json: any){
        if(json == null){
            this.houseMates = [];
            this.tasks = [];
            this.adjustedHouseMates = [];
            this.sunday = false;
        }else{
            if(typeof json == "string"){
                json = JSON.parse(json);
            }
            this.houseMates = json.houseMates;
            this.tasks = json.tasks;
            this.sunday = json.sunday;
            this.setAdjustedHouseMates();
        }
    }

    // If there are more task than houseMates, fill other array with repeated housemates until get the same length of tasks
    public setAdjustedHouseMates(){
        this.adjustedHouseMates = [];
        let i;
        let k;
        for(i=0, k=0; i<this.tasks.length; i++){
            if(k < this.houseMates.length){
                this.adjustedHouseMates[i] = this.houseMates[k];
            }else{
                k = 0;
                this.adjustedHouseMates[i] = this.houseMates[k];
            }
            k++;
        }
    }

}