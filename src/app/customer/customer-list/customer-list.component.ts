import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Customer } from "../customer.module";
import { CustomerService } from "../customer.service";

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html'
})

export class CustomerListComponent implements OnInit,OnDestroy{
    customers : Customer[] = [];
    getCustomersSubscription : Subscription;
    onCustomersChangedSubscription : Subscription;
    constructor(private customerService : CustomerService,
        private router: Router,private route:ActivatedRoute){}

    ngOnInit(): void {
        this.onCustomersChangedSubscription = this.customerService.onCustomersChanged.subscribe({
            next: () =>{
            this.getCustomers();
        }})
        this.getCustomers();
    }
    getCustomers(){
        this.getCustomersSubscription = this.customerService.getCustomers()
        .subscribe(response =>{
            this.customers = response;
        });
    }
    onSelect(id:number){
        this.router.navigate([id,'edit'],{relativeTo: this.route})
    }
    ngOnDestroy(): void {
        this.getCustomersSubscription.unsubscribe();
        this.onCustomersChangedSubscription.unsubscribe();
    }
}