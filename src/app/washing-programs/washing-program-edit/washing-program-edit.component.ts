import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { WashingProgramModel } from '../washing-program.model';
import { WashingProgramService } from '../washing-program.service';
import { WashingStepService } from '../washing-step.service';

@Component({
  selector: 'app-washing-program-edit',
  templateUrl: './washing-program-edit.component.html',
  styleUrls: ['./washing-program-edit.component.css']
})
export class WashingProgramEditComponent implements OnInit, OnDestroy {
  washingProgramForm : FormGroup;
  washingProgram: WashingProgramModel;
  id:number;
  editMode = false;
  washingProgramSteps : {id:number, name:string, stepOrder:number}[];
  getStepsByWashingProgramIdSubscription : Subscription;
  constructor(private route: ActivatedRoute,
              private washingProgramService: WashingProgramService,
              private washingStepService: WashingStepService) { }
  ngOnInit(): void {
      this.route.params.subscribe((params : Params)=>{
        this.id = +params["id"];
        this.editMode = params["id"];
        this.washingProgramService.washingProgramStepsChanged.subscribe(
          () => {
            this.getWashingProgramSteps();
          }
          )
          this.washingProgramService.getProgram(this.id).subscribe(
            response => {
              this.washingProgram = response;
              this.initForm();
            }
          )
        this.initForm();
        this.getWashingProgramSteps();
    })
  }
  getWashingProgramSteps()
  {
        this.getStepsByWashingProgramIdSubscription = this.washingStepService.getStepsByWashingProgramId(this.id)
        .subscribe(
          response =>{
            this.washingProgramSteps = response;
          }
        )
  }

  initForm(){
    var name = "";
    var price:number = null;
    var description = "";
    if(this.editMode && this.washingProgram){
      name = this.washingProgram.name;
      price = this.washingProgram.price;
      description = this.washingProgram.description;
      this.modalForNewStep = false;
    }
    this.washingProgramForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      description: new FormControl(description),
      price: new FormControl(price, Validators.required)
    })
  }

  onSubmit(){
    if(!this.editMode){
      this.washingProgramService.addProgram(this.washingProgramForm.value);
    }else{
      this.washingProgramService.updateProgram(this.id, this.washingProgramForm.value);
    }
  }
  onStepRemove(id : number){
    this.washingProgramService.removeStepFromProgram(this.id, id);
    //this.washingProgramSteps.splice(index,1);
  }
  modalForNewStep = false;

  onAddStep(){
    this.modalForNewStep = true;
  }

  ngOnDestroy(){
    this.getStepsByWashingProgramIdSubscription.unsubscribe();
  }

}
