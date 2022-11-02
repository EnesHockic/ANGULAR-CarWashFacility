import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { CustomerEditComponent } from "./customer/customer-edit/customer-edit.component";

import { CustomerComponent } from './customer/customer.component';
import { NotFoundComponent } from "./not-found/not-found.component";
import { ServiceManagementComponent } from "./service-management/service-management.component";
import { WashingProgramEditComponent } from "./washing-programs/washing-program-edit/washing-program-edit.component";
import { WashingProgramsComponent } from "./washing-programs/washing-programs.component";

const appRouts : Routes = [
    {path: '', component: ServiceManagementComponent,pathMatch: 'full'},
    {path: 'customer', component: CustomerComponent, children:[
      {path: 'new', component: CustomerEditComponent},
      {path: ':id/edit', component: CustomerEditComponent}
    ]},
    {path: 'washing-programs', component: WashingProgramsComponent, children:[
      {path: 'new', component: WashingProgramEditComponent},
      {path: ':id/edit', component: WashingProgramEditComponent}
    ]},
    {path: 'not-found', component: NotFoundComponent},
    {path: '**', redirectTo: '/not-found'}
  ]

@NgModule({
    imports:[RouterModule.forRoot(appRouts)],
    exports: [RouterModule]
})

export class AppRoutingModule{

}