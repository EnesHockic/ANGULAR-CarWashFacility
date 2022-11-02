import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { WashingProgramModel } from "./washing-program.model";

@Injectable({
    providedIn: 'root'
})

export class WashingProgramService{
    private washingPrograms : WashingProgramModel[] = [];
    
    washingProgramsFetched = new Subject<WashingProgramModel[]>;
    washingProgramStepsChanged = new Subject<boolean>;

    constructor(private http: HttpClient){
    }

    getPrograms(){
        return this.washingPrograms;
    }
    fetchPrograms(){
        return this.http.get<WashingProgramModel[]>('https://localhost:7013/api/Program')
        .subscribe(
            response => {
                this.washingPrograms = response;
                this.washingProgramsFetched.next(this.washingPrograms);
            }
        );
    }
    getFetchedProgram(id:number){
        return this.washingPrograms.find(el => el.id === id);
    }
    getProgram(id:number){
        return this.http.get<WashingProgramModel>('https://localhost:7013/api/Program/' + id);
    }
    addProgram(washingProgram: WashingProgramModel){
        this.http.post('https://localhost:7013/api/Program', washingProgram, {responseType: 'text'})
        .subscribe(
            {
                next: (response) =>{
                    this.fetchPrograms();
                }
            }
        )
        this.washingPrograms.push(washingProgram);
        //this.washingProgramsChanged.next(this.getPrograms());
    }
    updateProgram(id:number, updatedWashingProgram:WashingProgramModel)
    {
        this.http.put('https://localhost:7013/api/Program/' + id + '/edit',updatedWashingProgram,{responseType: 'text'})
        .subscribe({
            next: (response) =>{
                var program = this.washingPrograms.find(el => el.id === id);
                program.name = updatedWashingProgram.name;
                program.description = updatedWashingProgram.description;
                program.price = updatedWashingProgram.price;
            },
            error: (error) => {
                console.log(error);
            }
        })
        
    }
    addExistingStep(washingPogramId: number, stepId: number, numOfOrder: number){
        this.http.post('https://localhost:7013/api/Program/AddStep', 
        {programId: washingPogramId, stepId: stepId, stepOrder: numOfOrder},{responseType: 'text'}).subscribe(
            response=>{
                this.washingProgramStepsChanged.next(true);
            }
        )
    }
    removeStepFromProgram(washingPogramId: number, stepId: number){
        this.http.delete('https://localhost:7013/api/Program/' + washingPogramId +'/delete-step?stepId=' + stepId
        ,{responseType: 'text'})
        .subscribe(
            response =>{
                console.log(response);
            }
        )
    }
}