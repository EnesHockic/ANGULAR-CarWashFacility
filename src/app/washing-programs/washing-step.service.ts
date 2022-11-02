import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { WashingProgramService } from "./washing-program.service";

@Injectable({
    providedIn: 'root'
})

export class WashingStepService{
    constructor(private http: HttpClient,
        private washingProgramService: WashingProgramService){}
    
    addStep(stepName: string){
        return this.http.post('https://localhost:7013/api/Step',{name:stepName},{responseType: 'text'});
        
    }
    getStepsByWashingProgramId(programId: number){
        return this.http.get<{id:number, name:string, stepOrder:number}[]>
        ('https://localhost:7013/api/Step/ProgramSteps/' + programId);
    }
    getUnassignedSteps(){
        return this.http.get<{id:number, name:string}[]>
        ('https://localhost:7013/api/Step/UnassignedSteps');
    }
}