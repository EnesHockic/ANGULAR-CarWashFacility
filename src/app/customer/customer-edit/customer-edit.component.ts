import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Customer } from '../customer.module';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit, OnDestroy {
  customerForm : FormGroup;
  editingCustomerId:number;
  editingCustomer : Customer;
  editMode = false;
  getCustomerSubscription: Subscription;
  constructor(private route: ActivatedRoute,
    private customerService : CustomerService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params : Params)=>{
      this.editingCustomerId = params["id"];
      this.editMode = this.editingCustomerId != null;
      if(this.editMode){
        this.getCustomerSubscription = this.customerService.getCustomerById(this.editingCustomerId)
        .subscribe(response =>{
          this.editingCustomer = response;
          this.initForm();
          
        })
      }
    })
    this.initForm()
      
  }
  async initForm(){
    var firstName = '';
    var lastName = '';
    var phone = '';
    var car = '';
    if(this.editingCustomer){
      firstName = this.editingCustomer.firstName;
      lastName = this.editingCustomer.lastName;
      phone = this.editingCustomer.phone;
      car = this.editingCustomer.car;
    }
      this.customerForm = new FormGroup({
      'firstName':new FormControl(firstName,Validators.required),
      'lastName':new FormControl(lastName,Validators.required),
      'phone':new FormControl(phone),
      'car':new FormControl(car),
    })
  }
  onSubmit(){
    //Check if touched and valid
      if(!this.editMode){
      this.customerService.createCustomer(this.customerForm.value);
    }else{
      this.customerService.updateCustomer(this.editingCustomerId, this.customerForm.value);
    } 
  }
  ngOnDestroy(): void {
    if(this.getCustomerSubscription)
    {
      this.getCustomerSubscription.unsubscribe();
    }
  }
}
