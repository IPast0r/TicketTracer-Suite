import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TicketComponent } from './ticket/ticket.component';
import { NewTicketComponent } from './new-ticket/new-ticket.component';



@NgModule({
  declarations: [
    TicketComponent,
    NewTicketComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TicketModule { }
