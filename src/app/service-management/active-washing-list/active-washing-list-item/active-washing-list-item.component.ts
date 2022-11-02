import { Component, Input, OnInit, Output } from '@angular/core';
import { WashingModel } from '../../washing.model';
import { WashingService } from '../../washing.service';

@Component({
  selector: 'app-active-washing-list-item',
  templateUrl: './active-washing-list-item.component.html',
  styleUrls: ['./active-washing-list-item.component.css']
})
export class ActiveWashingListItemComponent implements OnInit {
  @Input() washingActivity: WashingModel;
  constructor(private washingService: WashingService) { }

  ngOnInit(): void {
  }
  onDoneActivity(){
    this.washingActivity.status = 'Done';
    this.washingService.updateWashingActivity(this.washingActivity);
  }
  onTerminate(){
    this.washingActivity.status = 'Terminated';
    this.washingService.updateWashingActivity(this.washingActivity);
  }
}
