import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html'
})

export class CustomerComponent implements OnInit{
    constructor(private router: Router,
                private route: ActivatedRoute){}
    
    ngOnInit(): void {
        
    }
    onNewCustomer(){
        this.router.navigate(["new"],{relativeTo: this.route});
      }
}