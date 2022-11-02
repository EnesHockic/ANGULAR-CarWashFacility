import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Customer } from './customer.module';

@Injectable({
    providedIn:'root'
})

export class CustomerService{
    onCustomersChanged = new Subject<boolean>;
    constructor(private http: HttpClient){}

    getCustomers(){
        return this.http.get<Customer[]>('https://localhost:7013/api/Customer');
    }
    getCustomerById(id:number){
        return this.http.get<Customer>('https://localhost:7013/api/Customer/'+id);
    }
    createCustomer(customer:Customer)
    {
        this.http.post('https://localhost:7013/api/Customer',customer,{responseType: 'text'})
        .subscribe(response =>{
            this.onCustomersChanged.next(true);
        });
    }
    updateCustomer(id:number, customer:Customer){
        this.http.put('https://localhost:7013/api/Customer/'+id +'/edit', customer, {responseType: 'text'})
        .subscribe(response =>{
            this.onCustomersChanged.next(true);
        })
    }
}