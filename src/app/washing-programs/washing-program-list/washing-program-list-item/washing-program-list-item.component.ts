import { Component, OnInit, Input } from '@angular/core';
import { WashingProgramModel } from '../../washing-program.model';

@Component({
  selector: 'app-washing-program-list-item',
  templateUrl: './washing-program-list-item.component.html',
  styleUrls: ['./washing-program-list-item.component.css']
})
export class WashingProgramListItemComponent implements OnInit {
  @Input() washingProgram : WashingProgramModel
  constructor() { }

  ngOnInit(): void {
  }

}
