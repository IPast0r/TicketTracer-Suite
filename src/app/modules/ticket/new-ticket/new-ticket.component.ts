import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from '../../shared/services/ticket.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../shared/services/category.service';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.css']
})
export class NewTicketComponent implements OnInit{
  
  public ticketForm!: FormGroup;
  formState: string = "";
  private fb = inject(FormBuilder);
  private ticketService = inject(TicketService);
  private categoryService = inject(CategoryService);
  private dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);

  categories: Category[] = [];
  category: any;
  cat: any;

  ngOnInit(): void {

    this.getCategories();
    this.formState = "Add";
    this.ticketForm = this.fb.group({
      name: ['',Validators.required],
      description: ['',Validators.required],
      priority: ['',Validators.required],
      category: ['',Validators.required]
    })

    if(null != this.data){
      this.updateForm(this.data);
      this.formState = "Update";
    }
    
  }

  onSave(){
    let data ={
      name: this.ticketForm.get('name')?.value,
      description: this.ticketForm.get('description')?.value,
      priotiry: this.ticketForm.get('priority')?.value,
      category: this.ticketForm.get('category')?.value
    }

    const uploadInfo = new FormData();
    uploadInfo.append('name', data.name);
    uploadInfo.append('description', data.description);
    uploadInfo.append('priority', data.priotiry);
    uploadInfo.append('categoryId', data.category);



    if(null != this.data){
        this.ticketService.updateTickets(uploadInfo , this.data.id) 
          .subscribe( (data : any) => {
            this.dialogRef.close(1);
          }),(error: any) => {
            this.dialogRef.close(2);
          }
      }else {
        this.ticketService.saveTickets(uploadInfo) 
          .subscribe( (data : any) => {
            this.dialogRef.close(1);
          }),(error: any) => {
            this.dialogRef.close(2);
          }
    }
  }

  onCancel(){
    this.dialogRef.close();
  }

  updateForm(data: any){
    this.ticketForm = this.fb.group({
      name: [data.name,Validators.required],
      description: [data.description,Validators.required],
      priority: [data.priority,Validators.required],
      category: [data.category,Validators.required]
    });
  }  

  getCategories(){
    this.categoryService.getCategories()
      .subscribe( (data: any) => {
        this.categories = data.categoryResponse.category;
      });
  }
  getCategoryById(id : any){
    this.categoryService.getCategoryById(id)
      .subscribe( (data: any) => {
        this.category = data.categoryResponse.category;
      });
  }
}

export interface Category{
  description: string;
  id: number;
  name: string;
}