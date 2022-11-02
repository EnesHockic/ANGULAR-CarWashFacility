import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/customer/customer.module';
import { CustomerService } from 'src/app/customer/customer.service';
import { WashingProgramModel } from 'src/app/washing-programs/washing-program.model';
import { WashingProgramService } from 'src/app/washing-programs/washing-program.service';
import { WashingModel } from '../washing.model';
import { WashingService } from '../washing.service';

@Component({
  selector: 'app-add-active-washing',
  templateUrl: './add-active-washing.component.html',
  styleUrls: ['./add-active-washing.component.css']
})
export class AddActiveWashingComponent implements OnInit, OnDestroy {
  customers: Customer[];
  washingPrograms: WashingProgramModel[];
  customersSubscription: Subscription;
  programsSubscription: Subscription;
  prepareWashingSubscription: Subscription;
  preparedWashing: WashingModel;
  selectedCustomerId: number;
  selectedCustomer: Customer;
  selectedWashingProgram: WashingProgramModel;
  constructor(private customerService: CustomerService,
              private washingProgramService: WashingProgramService,
              private washingService: WashingService) { }

  ngOnInit(): void {
    this.customersSubscription = this.customerService.getCustomers().subscribe(
      customers =>{
        this.customers = customers;
      }
    )
    this.programsSubscription = this.washingProgramService.washingProgramsFetched.subscribe(
      () =>
      this.washingPrograms = this.washingProgramService.getPrograms()
    )
    this.washingProgramService.fetchPrograms();
  }
  onPrepareSubmit(f:NgForm){
    this.prepareWashingSubscription = this.washingService.prepareWashing(f.value.customerId, f.value.washingProgramId)
    .subscribe(
      response =>{
        this.preparedWashing = response;
      }
    )
  }
  onCreateWashingActivity(){
    this.washingService.createWashingActivity(this.preparedWashing);
    this.preparedWashing = null;
  }
  onCustomerSelected(event){
    this.selectedCustomer = this.customers.find(el => el.id == event.target.value);
  }
  onWashingProgramSelected(event){
    this.selectedWashingProgram = this.washingPrograms.find(el => el.id == event.target.value);
  }
  onCancel(){
    this.preparedWashing = null;
  }
  ngOnDestroy(){
    this.customersSubscription.unsubscribe();
    this.programsSubscription.unsubscribe();
    if(this.prepareWashingSubscription)
    {
      this.prepareWashingSubscription.unsubscribe();
    }
  }
}
