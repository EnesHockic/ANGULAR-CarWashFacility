import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Customer } from "../customer/customer.module";
import { WashingProgramModel } from "../washing-programs/washing-program.model";
import { WashingModel } from "./washing.model";

@Injectable({
    providedIn: 'root'
})

export class WashingService{
    washingActivities: WashingModel[] = [];
    onWashingActivitiesChanged = new Subject<boolean>;
    constructor(private http: HttpClient){
    }


    prepareWashing(customerId:number, washingProgramId:number){
        return this.http.get<WashingModel>(`https://localhost:7013/api/Activity/Prepare?programId=${washingProgramId}&customerId=${customerId}`);
    }
    createWashingActivity(washingActivity: WashingModel){
        this.http.post('https://localhost:7013/api/Activity',washingActivity,{responseType: 'text'})
        .subscribe(
            () => this.onWashingActivitiesChanged.next(true)
        )
    }

    fetchWashingActivitiesByStatus (status:string){
        return this.http.get<WashingModel[]>('https://localhost:7013/api/Activity/GetByStatus?status=' + status);
        
    }
    updateWashingActivity(activity: WashingModel){
        this.http.put('https://localhost:7013/api/Activity/', activity)
        .subscribe(
            () => this.onWashingActivitiesChanged.next(true)
        )
    }
}