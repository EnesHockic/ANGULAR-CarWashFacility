import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WashingProgramModel } from '../../washing-program.model';
import { WashingProgramService } from '../../washing-program.service';
import { WashingStepService } from '../../washing-step.service';

@Component({
  selector: 'app-washing-program-add-step',
  templateUrl: './washing-program-add-step.component.html',
  styleUrls: ['./washing-program-add-step.component.css']
})
export class WashingProgramAddStepComponent implements OnInit {
  pickStepForm : FormGroup;
  newStepForm: FormGroup;
  washingPrograms : WashingProgramModel[]
  selectedProgramSteps : {id:number, name:string}[]
  @Input() currentWashingProgramId:number;
  constructor(private washingProgramService:WashingProgramService,
    private washingStepService: WashingStepService) { }

  ngOnInit(): void {
    this.washingPrograms = this.washingProgramService.getPrograms().filter(el => el.id !== this.currentWashingProgramId);
    this.initForms();
  }

  initForms(){
    this.pickStepForm = new FormGroup({
      washingPogramId: new FormControl(null),
      stepId : new FormControl(null, Validators.required),
      numOfOrder : new FormControl(null)
    })
    this.newStepForm = new FormGroup({
      stepName : new FormControl(null, Validators.required),
      numOfOrder : new FormControl(null)
    })
  }

  onProgramSelected(id:number){
      if(id == 0){
      this.washingStepService.getUnassignedSteps()
      .subscribe(
        response => {
          this.selectedProgramSteps = response;
        }
      )
    }else{

      this.washingStepService.getStepsByWashingProgramId(id)
      .subscribe(
        response => {
          this.selectedProgramSteps = response;
        }
        )
    }
  }
  onPickSubmit(){
    this.washingProgramService.addExistingStep(this.currentWashingProgramId, 
              this.pickStepForm.value.stepId, this.pickStepForm.value.numOfOrder);
  }

  onNewSubmit(){
    this.washingStepService.addStep(this.newStepForm.value.stepName)
    .subscribe({
      next: (response) =>{
        this.washingProgramService.addExistingStep(this.currentWashingProgramId,+response,this.newStepForm.value.numOfOrder);
      }
    });
  }
}
