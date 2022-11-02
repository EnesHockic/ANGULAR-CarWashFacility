import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './header/header.component'
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerEditComponent } from './customer/customer-edit/customer-edit.component';
import { WashingProgramsComponent } from './washing-programs/washing-programs.component';
import { WashingProgramListComponent } from './washing-programs/washing-program-list/washing-program-list.component';
import { WashingProgramListItemComponent } from './washing-programs/washing-program-list/washing-program-list-item/washing-program-list-item.component';
import { WashingProgramEditComponent } from './washing-programs/washing-program-edit/washing-program-edit.component';
import { WashingProgramAddStepComponent } from './washing-programs/washing-program-edit/washing-program-add-step/washing-program-add-step.component';
import { ServiceManagementComponent } from './service-management/service-management.component';
import { AddActiveWashingComponent } from './service-management/add-active-washing/add-active-washing.component';
import { ActiveWashingListComponent } from './service-management/active-washing-list/active-washing-list.component';
import { ActiveWashingListItemComponent } from './service-management/active-washing-list/active-washing-list-item/active-washing-list-item.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    HeaderComponent,
    CustomerListComponent,
    CustomerEditComponent,
    WashingProgramsComponent,
    WashingProgramListComponent,
    WashingProgramListItemComponent,
    WashingProgramEditComponent,
    WashingProgramAddStepComponent,
    ServiceManagementComponent,
    AddActiveWashingComponent,
    ActiveWashingListComponent,
    ActiveWashingListItemComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
