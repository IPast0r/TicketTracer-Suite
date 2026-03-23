import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})

export class ConfirmComponent implements OnInit{
  
  ngOnInit(): void {
  }

  private ticketService = inject(TicketService);
  private categoryService = inject(CategoryService);
  private dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);
  
  onCancel(){
    this.dialogRef.close(3);
  }  

  delete(){

    if(null != this.data){
      if(this.data.type == "Category"){
        this.categoryService.deleteCategories(this.data.id)
          .subscribe( (data : any) => {
            this.dialogRef.close(1);
          }),(error: any) => {
            this.dialogRef.close(2);
          }
      }else {
        this.ticketService.deleteTickets(this.data.id)
          .subscribe( (data : any) => {
            this.dialogRef.close(1);
          }),(error: any) => {
            this.dialogRef.close(2);
          }
      }
    }else {
      this.dialogRef.close(2);
    }

  }

}
