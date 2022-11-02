import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WashingModel } from '../washing.model';
import { WashingService } from '../washing.service';

@Component({
  selector: 'app-active-washing-list',
  templateUrl: './active-washing-list.component.html',
  styleUrls: ['./active-washing-list.component.css']
})
export class ActiveWashingListComponent implements OnInit, OnDestroy {
  activeWashingActivities: WashingModel[];
  fetchSubscription : Subscription;
  onChangeTrackSubscription : Subscription;
  constructor(private washingService: WashingService) { }

  ngOnInit(): void {
    
    this.fetchWashingActivities();
    this.onChangeTrackSubscription = this.washingService.onWashingActivitiesChanged.subscribe(
      () => {
        //this.activeWashingActivities = this.washingService.fetchWashingActivitiesByStatus('status');
        this.fetchWashingActivities();
      }
    )
  }
  fetchWashingActivities(){
    this.fetchSubscription = this.washingService.fetchWashingActivitiesByStatus('active')
    .subscribe(
      (response) =>{
          this.activeWashingActivities = response;
      }
  );
  }
  ngOnDestroy() {
    this.fetchSubscription.unsubscribe();
    this.onChangeTrackSubscription.unsubscribe();
  }
}
