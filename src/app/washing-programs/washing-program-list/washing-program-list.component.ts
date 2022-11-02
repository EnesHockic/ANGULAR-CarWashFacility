import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WashingProgramModel } from '../washing-program.model';
import { WashingProgramService } from '../washing-program.service';

@Component({
  selector: 'app-washing-program-list',
  templateUrl: './washing-program-list.component.html',
  styleUrls: ['./washing-program-list.component.css']
})
export class WashingProgramListComponent implements OnInit, OnDestroy {
  washingPrograms : WashingProgramModel[];
  subscription : Subscription;
  constructor(private washingProgramService: WashingProgramService) { }

  ngOnInit(): void {
    this.washingProgramService.fetchPrograms();
    this.subscription = this.washingProgramService.washingProgramsFetched.subscribe
    (
      response =>{
          this.washingPrograms = response
        }
    )
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
